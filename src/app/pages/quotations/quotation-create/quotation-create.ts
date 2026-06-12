import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Quotation,CreateQuotationRequest,QuotationPayload,QuotationItem   }from '../../../core/models/quotation.model';
import { QuotationService }from '../../../core/services/quotation.service';


@Component({
  selector: 'app-quot-primary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
],
  templateUrl: './quotation-create.html',
  styleUrls: ['./quotation-create.scss'],
})
export class QuotPrimary {

  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router,private quotationService: QuotationService) {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

   if (this.isSubmitting) return;
   this.isSubmitting = true;

  const formValue = this.form.value;

const payload: CreateQuotationRequest = {
  customer_name: formValue.customerName,
  email: formValue.email,
  phone: formValue.phoneNumber,
  job_name: '',           // empty until Step 2
  job_type: 'book',       // default
  status: 'DRAFT'
};

  this.quotationService.addQuotation(payload).subscribe({
    next: (res) => {
      console.log('Quotation saved:', res.id);
      alert('Quotation created successfully');
      this.router.navigate([`/quotations/quotation-create/quotations-details/${res.id}`]);
    },
    error: (err) => {
      console.error('Error creating quotation', err);
      alert('Failed to create quotation');
    }
  });
}
}
 
   