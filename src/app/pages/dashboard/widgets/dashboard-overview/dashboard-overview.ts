import { Component ,inject} from '@angular/core';
import{CommonModule} from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service'; 

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-overview.html',
  styleUrls: ['./dashboard-overview.scss'],
})
export class DashboardOverview {

   readonly dashboardService = inject(DashboardService);

}
