import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { QuotationService } from '../../../core/services/quotation.service';
import { Quotation, QuotationStatus } from '../../../core/models/quotation.model';

@Component({
  selector: 'app-quotations-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './quotations-list.html',
  styleUrls: ['./quotations-list.scss'],
})
export class QuotationsList implements OnInit {
  private readonly router = inject(Router);
  private readonly quotationService = inject(QuotationService);

  // Read-only signal directly exposing state from service layer
  readonly quotations = this.quotationService.quotations;

  readonly searchTerm = signal<string>('');
  readonly selectedStatus = signal<string>('All Status');

  readonly statusOptions: QuotationStatus[] = [
    'DRAFT',
    'SENT',
    'PENDING',
    'CONFIRMED',
    'CANCELLED'
  ];

  // Inline Editing Properties
  readonly editRowId = signal<number | null>(null);
  editCache: Partial<Quotation> = {};

  // Email Loading State Property
  readonly sendingEmailId = signal<number | null>(null);

  // Convert to Production Job Signal States
  readonly convertingId = signal<number | null>(null);
  readonly showConvertForm = signal<boolean>(false);
  readonly convertDueDate = signal<string>('');
  readonly convertPriority = signal<string>('MEDIUM');

  ngOnInit(): void {
    this.loadQuotations();
  }

  loadQuotations(): void {
    this.quotationService.getAll().subscribe({
      next: (data) => {
        console.log('Quotations loaded successfully:', data);
      },
      error: (err) => {
        console.error('Failed to load quotations from database:', err);
      }
    });
  }

  // Reactive filtering logic matching searches dynamically
  readonly filtered = computed<Quotation[]>(() => {
    let list = this.quotations();

    /* STATUS FILTER HANDLING */
    const status = this.selectedStatus();
    if (status !== 'All Status') {
      list = list.filter(q => q.status === status);
    }

    /* TEXT SEARCH BAR FILTER HANDLING */
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return list;

    return list.filter(q =>
      q.id?.toString().includes(term) ||
      q.job_name?.toLowerCase().includes(term) ||
      q.customer_name?.toLowerCase().includes(term) ||
      q.status?.toLowerCase().includes(term)
    );
  });

  /**
   * Helper method to map quotation statuses cleanly to their CSS counter-parts
   * used directly inside the dynamic HTML select-badge bindings.
   */
  statusClass(status: string | undefined): string {
    if (!status) return 'status-draft';
    return `status-${status.toLowerCase()}`;
  }

  trackById(_index: number, q: Quotation): number {
    return q.id ?? 0;
  }

  trackByStatus(_index: number, s: string): string {
    return s;
  }

  openCreateDialog(): void {
    this.router.navigate(['/quotations/quotation-create']);
  }

  /* ── INLINE EDIT LIFESTAGE CONTROLS ── */
  startEdit(q: Quotation): void {
    this.editRowId.set(q.id ?? null);
    this.editCache = { ...q };
  }

  cancelEdit(): void {
    this.editRowId.set(null);
    this.editCache = {};
  }

  saveEdit(q: Quotation): void {
    if (!q.id) return;

    const changes: Partial<Quotation> = { ...this.editCache };

    this.quotationService.updateQuotation(q.id, changes).subscribe({
      next: () => {
        console.log('Inline changes saved successfully.');
        this.cancelEdit();
        this.loadQuotations(); 
      },
      error: (err: any) => {
        console.error('Error saving inline edits:', err);
        alert('Failed to update quotation settings.');
      }
    });
  }

  delete(id: number): void {
    if (!confirm(`Are you sure you want to permanently delete quotation ${id}?`)) {
      return;
    }

    this.quotationService.deleteQuotation(id).subscribe({
      next: () => {
        console.log(`Quotation ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error('Deletion request rejected:', err);
        alert('Failed to delete quotation.');
      }
    });
  }

  onStatusChange(q: Quotation, newStatus: QuotationStatus): void {
    if (!q.id || !q.status) return;

    const currentStatus = q.status.toUpperCase() as QuotationStatus;

    if (this.quotationService.isValidStatusTransition(currentStatus, newStatus)) {
      console.log(`Sending state transition request: ${currentStatus} ➔ ${newStatus}`);

      this.quotationService.changeStatus(q.id, newStatus).subscribe({
        next: (updated) => {
          console.log(`Status updated successfully for ID: ${q.id}`, updated);
          this.loadQuotations();
        },
        error: (err) => {
          console.error('Database rejected state transition:', err);
          alert('Failed to save status change to the server.');
        }
      });
    } else {
      alert(`Invalid business flow change: Cannot move directly from ${currentStatus} to ${newStatus}.`);
    }
  }

  sendEmail(q: Quotation): void {
    if (!q.id) return;
    this.sendingEmailId.set(q.id);

    this.quotationService.sendQuotationEmail(q.id).subscribe({
      next: () => {
        alert(`Email sent to customer for quotation ${q.id}`);
        this.sendingEmailId.set(null);
      },
      error: (err) => {
        console.error('Email dispatch failed:', err);
        alert(err.error?.message || 'Failed to send email');
        this.sendingEmailId.set(null);
      }
    });
  }

  /* ── CONVERT TO JOB MODAL HANDLERS ── */
  openConvertForm(q: Quotation): void {
    // Structural guard if an associated job is already mapped
    if (q.associated_job_id) {
      alert('This quotation has already been converted to a production job.');
      return;
    }
    this.convertingId.set(q.id ?? null);
    this.convertDueDate.set('');
    this.convertPriority.set('MEDIUM');
    this.showConvertForm.set(true);
  }

  closeConvertForm(): void {
    this.convertingId.set(null);
    this.showConvertForm.set(false);
  }

  confirmConvert(): void {
    const id = this.convertingId();
    const dueDate = this.convertDueDate();
    const priority = this.convertPriority();

    if (!id) return;

    if (!dueDate) {
      alert('Please select a structural delivery due date.');
      return;
    }

    this.quotationService.convertToJob(id, dueDate, priority).subscribe({
      next: (job: any) => {
        alert(`Job Ticket ${job.job_number || id} generated successfully!`);
        this.closeConvertForm();
        this.loadQuotations(); 
      },
      error: (err: any) => {
        console.error('Convert lifecycle failed:', err);
        alert(err.error?.message || 'Failed to map quotation to production job queue.');
      }
    });
  }
}