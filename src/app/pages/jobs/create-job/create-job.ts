import {
  Component, OnInit, inject,
  Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { JobService } from '../../../core/services/job.service';
import { CustomerService } from '../../../core/services/customer.service';
import { CreateDirectJobRequest } from '../../../core/models/job.models';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.scss']
})
export class CreateJob implements OnInit {

  @Output() jobCreated = new EventEmitter<void>();
  @Output() cancelled  = new EventEmitter<void>();

  private fb              = inject(FormBuilder);
  private jobService      = inject(JobService);
  private customerService = inject(CustomerService);

  // Loaded from backend
  customers: any[] = [];
  machines:  any[] = [];

  isSubmitting = false;

  form = this.fb.group({
    job_name:       ['', Validators.required],
    job_type:       [''],
    customer_id:    [null as number | null, Validators.required],
    quantity:       [null as number | null],
    width:          [null as number | null],
    height:         [null as number | null],
    pages:          [null as number | null],
    material:       [''],
    cover_material: [''],
    binding_id:     [null as number | null],
    lamination_id:  [null as number | null],
    machine_id:     [null as number | null],
    priority:       ['MEDIUM'],
    due_date:       [''],
    remarks:        ['']
  });

  ngOnInit(): void {
    // Load machines from signal
    this.machines = this.jobService.machines();

    // Load customers from backend
    this.customerService.getAll().subscribe({
      next: (data) => { this.customers = data; },
      error: (err)  => { console.error('Failed to load customers:', err); }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const v = this.form.value;

    const payload: CreateDirectJobRequest = {
      job_name:       v.job_name        ?? '',
      job_type:       v.job_type        || undefined,
      customer_id:    v.customer_id!,
      quantity:       v.quantity        || undefined,
      width:          v.width           || undefined,
      height:         v.height          || undefined,
      pages:          v.pages           || undefined,
      material:       v.material        || undefined,
      cover_material: v.cover_material  || undefined,
      binding_id:     v.binding_id      ?? null,
      lamination_id:  v.lamination_id   ?? null,
      machine_id:     v.machine_id      ?? null,
      priority:       (v.priority as any) || 'MEDIUM',
      due_date:       v.due_date        || undefined,
      remarks:        v.remarks         || undefined
    };

    this.jobService.createDirectJob(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.jobCreated.emit();
      },
      error: (err) => {
        console.error('Create job failed:', err);
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}