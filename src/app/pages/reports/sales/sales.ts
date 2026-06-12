import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sales.html',
  styleUrls: ['./sales.scss'],
})
export class Sales {
  filters = {
    from: '2026-05-01',
    to: '2026-05-31',
  };

  summaryCards = [
    { title: 'Estimated Revenue', value: 'LKR 1,250,000', note: 'Confirmed quotation value' },
    { title: 'Completed Job Value', value: 'LKR 890,000', note: 'Completed job tickets' },
    { title: 'Estimated Profit', value: 'LKR 315,000', note: 'Based on quotation margin' },
    { title: 'Highest Job', value: 'LKR 112,000', note: 'Green Leaf School' },
  ];

  rows = [
    { id: 'Q-1024', customer: 'ABC Company', type: 'Booklets', value: 'LKR 85,000', margin: '24%', status: 'Confirmed' },
    { id: 'Q-1026', customer: 'Green Leaf School', type: 'Exercise Books', value: 'LKR 112,000', margin: '28%', status: 'Confirmed' },
    { id: 'Q-1019', customer: 'Nimal Stores', type: 'Flyers', value: 'LKR 42,500', margin: '21%', status: 'Pending' },
    { id: 'Q-1018', customer: 'City Pharmacy', type: 'Labels', value: 'LKR 18,000', margin: '19%', status: 'Completed' },
  ];

  monthlyRows = [
    { month: 'March', quotations: 78, revenue: 'LKR 840,000' },
    { month: 'April', quotations: 91, revenue: 'LKR 1,040,000' },
    { month: 'May', quotations: 102, revenue: 'LKR 1,250,000' },
  ];

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
