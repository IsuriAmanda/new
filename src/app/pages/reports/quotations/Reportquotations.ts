import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-quotations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './Reportquotations.html',
  styleUrls: ['./Reportquotations.scss'],
})
export class ReportQuotations {
  filters = {
    month: '2026-05',
    status: 'All',
  };

  summaryCards = [
    { title: 'Total Quotations', value: '245', note: 'Created this month' },
    { title: 'Confirmed', value: '180', note: 'Ready for job tickets' },
    { title: 'Rejected', value: '32', note: 'Lost or cancelled requests' },
    { title: 'Average Value', value: 'LKR 12,500', note: 'Per quotation' },
  ];

  statusRows = [
    { status: 'Draft', count: 18, percent: 7 },
    { status: 'Sent', count: 27, percent: 11 },
    { status: 'Pending', count: 20, percent: 8 },
    { status: 'Confirmed', count: 180, percent: 74 },
  ];

  requestedItems = [
    { name: 'Booklets', category: 'Job type', count: 64 },
    { name: 'Art Paper 120gsm', category: 'Material', count: 58 },
    { name: 'Gloss Lamination', category: 'Supply', count: 41 },
    { name: 'Perfect Binding', category: 'Binding', count: 36 },
  ];

  quotationRows = [
    { id: 'Q-1024', customer: 'ABC Company', date: '2026-05-28', total: 'LKR 85,000', status: 'Confirmed' },
    { id: 'Q-1025', customer: 'Nimal Stores', date: '2026-05-27', total: 'LKR 42,500', status: 'Pending' },
    { id: 'Q-1026', customer: 'Green Leaf School', date: '2026-05-25', total: 'LKR 112,000', status: 'Sent' },
    { id: 'Q-1027', customer: 'City Pharmacy', date: '2026-05-22', total: 'LKR 18,000', status: 'Rejected' },
  ];

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
