import { Component } from '@angular/core';
import { DashboardCard } from '../dashboard-card/dashboard-card';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge/status-badge';
import { CommonModule } from '@angular/common';
import { SectionTitle } from '../shared/section-title/section-title';
import { ProgressBar } from '../shared/progress-bar/progress-bar';


@Component({
  selector: 'app-customer-report',
  standalone: true,
  imports: [
    DashboardCard,
    StatusBadge
  ],
  templateUrl: './customer-report.html',
  styleUrls: ['./customer-report.scss'],
})
export class CustomerReport {

}
