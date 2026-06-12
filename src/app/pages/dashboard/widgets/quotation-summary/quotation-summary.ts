import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardCard } from '../dashboard-card/dashboard-card';

@Component({
  selector: 'app-quotation-summary',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    DashboardCard
  ],
  templateUrl: './quotation-summary.html',
  styleUrls: ['./quotation-summary.scss']
})
export class QuotationSummary {

  doughnutChartLabels: string[] = [
    'Confirmed',
    'Rejected',
    'Pending'
  ];

  doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [180, 32, 20]
      }
    ]
  };

  doughnutChartType: any = 'doughnut';

}