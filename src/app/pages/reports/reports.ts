import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
})
export class Reports {
  filters = {
    from: '2026-05-01',
    to: '2026-05-31',
    status: 'All',
  };

  reportData = [
    {
      title: 'Quotation Value',
      value: 'LKR 1,250,000',
      helper: 'Confirmed and pending quotations',
      tone: 'green',
    },
    {
      title: 'Active Jobs',
      value: '42',
      helper: 'Jobs currently in production',
      tone: 'blue',
    },
    {
      title: 'Delayed Jobs',
      value: '8',
      helper: 'Past due date or blocked stage',
      tone: 'red',
    },
    {
      title: 'Completed Jobs',
      value: '132',
      helper: 'Finished during selected period',
      tone: 'neutral',
    },
  ];

  reportCards = [
    {
      title: 'Quotation Report',
      route: '/reports/quotations',
      description: 'Track quotation count, confirmed vs rejected, average value, and high-value requests.',
      metrics: ['Total quotations', 'Status split', 'Monthly value'],
    },
    {
      title: 'Production Report',
      route: '/reports/production',
      description: 'View jobs by stage, delayed jobs, department workload, and completion progress.',
      metrics: ['Stage counts', 'Late jobs', 'Department workload'],
    },
    {
      title: 'Revenue Summary',
      route: '/reports/sales',
      description: 'Estimate revenue from confirmed quotations and completed job tickets.',
      metrics: ['Monthly revenue', 'Top jobs', 'Profit estimate'],
    },
    {
      title: 'Customer Report',
      route: '/reports',
      description: 'Identify top customers, repeat customers, and order frequency patterns.',
      metrics: ['Top customers', 'Repeat orders', 'Activity'],
    },
    {
      title: 'Supply Usage Report',
      route: '/reports',
      description: 'Summarize material usage from quotation costing and stock movement.',
      metrics: ['Paper usage', 'Binding usage', 'Stock alerts'],
    },
    {
      title: 'Machine Utilization',
      route: '/reports',
      description: 'Review machine workload, idle machines, and assigned production jobs.',
      metrics: ['Most used', 'Idle machines', 'Workload'],
    },
  ];

  recentReports = [
    {
      id: 'Q-1024',
      type: 'Quotation',
      customer: 'ABC Company',
      value: 'LKR 85,000',
      status: 'Confirmed',
    },
    {
      id: 'J-0388',
      type: 'Production',
      customer: 'Green Leaf School',
      value: 'Binding',
      status: 'Delayed',
    },
    {
      id: 'Q-1025',
      type: 'Quotation',
      customer: 'Nimal Stores',
      value: 'LKR 42,500',
      status: 'Pending',
    },
    {
      id: 'M-004',
      type: 'Machine',
      customer: 'Heidelberg GTO',
      value: '82% workload',
      status: 'Active',
    },
  ];

  customerRows = [
    { name: 'ABC Company', orders: 18, total: 'LKR 620,000', frequency: 'Weekly' },
    { name: 'Green Leaf School', orders: 12, total: 'LKR 410,000', frequency: 'Monthly' },
    { name: 'Nimal Stores', orders: 9, total: 'LKR 255,000', frequency: 'Monthly' },
  ];

  supplyRows = [
    { item: 'Art Paper 120gsm', category: 'Material', usage: '4,800 sheets', status: 'High usage' },
    { item: 'Gloss Lamination', category: 'Laminating', usage: '62 jobs', status: 'Normal' },
    { item: 'Perfect Binding', category: 'Binding', usage: '38 jobs', status: 'Normal' },
  ];

  getStatusClass(status: string): string {
    return status.toLowerCase().replaceAll(' ', '-');
  }
}
