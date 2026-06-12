import {
  Component, OnInit, inject, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JobService } from '../../../core/services/job.service';
import { CreateJob } from '../create-job/create-job';
import { JobTicket, JobStatus } from '../../../core/models/job.models';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CreateJob        // ← required for modal to work
  ],
  templateUrl: './jobs-list.html',
  styleUrls: ['./jobs-list.scss']
})
export class JobsList implements OnInit {

  private jobService = inject(JobService);

  // ── Data ───────────────────────────────────────────────────
  readonly jobs     = this.jobService.jobs;
  readonly machines = this.jobService.machines;

  // ── Filters ────────────────────────────────────────────────
  readonly searchTerm   = signal('');
  readonly statusFilter = signal('All');

  // ── UI State ───────────────────────────────────────────────
  readonly showCreateModal = signal(false);
  isLoading = false;

  // ── Inline Edit ────────────────────────────────────────────
  readonly editRowId = signal<number | null>(null);
  editCache: Partial<JobTicket> = {};

  // ── Status Options ─────────────────────────────────────────
  readonly statuses: JobStatus[] = [
    'PRINTING', 'CUTTING', 'FOLDING',
    'BINDING',  'PACKING', 'COMPLETED'
  ];

  readonly priorityOptions = ['LOW', 'MEDIUM', 'URGENT'];

  // ── Filtered List ──────────────────────────────────────────
  readonly filteredJobs = computed<JobTicket[]>(() => {
    let list = this.jobs();

    const status = this.statusFilter();
    if (status !== 'All') {
      list = list.filter(j => j.status === status);
    }

    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return list;

    return list.filter(j =>
      j.job_number?.toLowerCase().includes(term) ||
      j.job_name?.toLowerCase().includes(term)   ||
      j.customer_name?.toLowerCase().includes(term)
    );
  });

  // ── Lifecycle ──────────────────────────────────────────────
  ngOnInit(): void {
    this.loadJobs();
    this.jobService.getMachines().subscribe();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getAll().subscribe({
      next:  () => { this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  // ── Inline Edit ────────────────────────────────────────────
  startEdit(job: JobTicket): void {
    this.editRowId.set(job.job_id ?? null);
    this.editCache = { ...job };
  }

  cancelEdit(): void {
    this.editRowId.set(null);
    this.editCache = {};
  }

  saveEdit(job: JobTicket): void {
    const updated = { ...job, ...this.editCache };

    this.jobService.updateStatus(
      job.job_id!,
      updated.status ?? job.status!,
      updated.remarks
    ).subscribe({
      next: () => {
        this.loadJobs();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Save failed:', err);
        alert('Failed to save job');
      }
    });
  }

  // ── Status Update ──────────────────────────────────────────
  updateStatus(job: JobTicket, status: JobStatus): void {
    this.jobService.updateStatus(job.job_id!, status).subscribe({
      error: (err) => console.error('Status update failed:', err)
    });
  }

  // ── Machine Assign ─────────────────────────────────────────
  assignMachine(job: JobTicket, machineId: string): void {
    if (!machineId) return;
    this.jobService.assignMachine(
      job.job_id!, Number(machineId)
    ).subscribe({
      error: (err) => console.error('Machine assign failed:', err)
    });
  }

  // ── Delete ─────────────────────────────────────────────────
  deleteJob(job: JobTicket): void {
    if (!confirm(`Delete job ${job.job_number}?`)) return;
    this.jobService.deleteJob(job.job_id!).subscribe({
      error: (err) => console.error('Delete failed:', err)
    });
  }

  // ── Modal ──────────────────────────────────────────────────
  openCreateModal(): void  { this.showCreateModal.set(true);  }
  closeCreateModal(): void { this.showCreateModal.set(false); }

  onJobCreated(): void {
    this.closeCreateModal();
    this.loadJobs();
  }

  // ── Helpers ────────────────────────────────────────────────
  priorityClass(priority: string): string {
    const map: Record<string, string> = {
      LOW:    'priority-low',
      MEDIUM: 'priority-medium',
      URGENT: 'priority-urgent'
    };
    return map[priority] ?? '';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      PRINTING:  'status-printing',
      CUTTING:   'status-cutting',
      FOLDING:   'status-folding',
      BINDING:   'status-binding',
      PACKING:   'status-packing',
      COMPLETED: 'status-completed'
    };
    return map[status] ?? '';
  }
  
}