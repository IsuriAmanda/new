import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-production',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './Reportproduction.html',
  styleUrls: ['./Reportproduction.scss'],
})
export class ReportProduction {
  filters = {
    department: 'All',
    stage: 'All',
  };

  summaryCards = [
    { title: 'Jobs In Production', value: '42', note: 'Across all departments' },
    { title: 'Completed Jobs', value: '132', note: 'Finished this month' },
    { title: 'Delayed Jobs', value: '8', note: 'Need manager attention' },
    { title: 'Avg Completion', value: '3.4 days', note: 'Per job ticket' },
  ];

  stages = [
    { name: 'Printing', count: 11, percent: 78 },
    { name: 'Cutting', count: 8, percent: 58 },
    { name: 'Folding', count: 5, percent: 36 },
    { name: 'Binding', count: 7, percent: 50 },
    { name: 'Packing', count: 4, percent: 28 },
    { name: 'Completed', count: 132, percent: 100 },
  ];

  departments = [
    { name: 'Printing', active: 11, delayed: 2, workload: 'High' },
    { name: 'Binding', active: 7, delayed: 3, workload: 'High' },
    { name: 'Cutting', active: 8, delayed: 1, workload: 'Normal' },
    { name: 'Packing', active: 4, delayed: 0, workload: 'Normal' },
  ];

  jobRows = [
    { id: 'J-0388', quotation: 'Q-1024', customer: 'ABC Company', stage: 'Binding', due: '2026-06-02', status: 'Delayed' },
    { id: 'J-0389', quotation: 'Q-1022', customer: 'Green Leaf School', stage: 'Printing', due: '2026-06-04', status: 'Active' },
    { id: 'J-0390', quotation: 'Q-1019', customer: 'Nimal Stores', stage: 'Packing', due: '2026-06-01', status: 'Pending' },
    { id: 'J-0391', quotation: 'Q-1018', customer: 'City Pharmacy', stage: 'Completed', due: '2026-05-30', status: 'Completed' },
  ];

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
