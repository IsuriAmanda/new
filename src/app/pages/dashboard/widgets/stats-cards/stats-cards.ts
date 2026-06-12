import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardStats } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrls: ['./stats-cards.scss']
})
export class StatsCards{

  private dashboardService = inject(DashboardService);



}