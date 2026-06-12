import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from '../dashboard-card/dashboard-card';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { UserOverview } from '../../../../core/models/dashboard.models';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, DashboardCard],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
})

export class UserManagement {
  dashboardService: DashboardService;


  constructor(dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
    
  }

}
