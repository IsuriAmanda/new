import { Component } from '@angular/core';
import { DashboardCard } from '../dashboard-card/dashboard-card';

@Component({
  selector: 'app-production-progress',
  standalone: true,
  imports: [
    DashboardCard
  ],
  templateUrl: './production-progress.html',
  styleUrls: ['./production-progress.scss'],
})
export class ProductionProgress {

}
