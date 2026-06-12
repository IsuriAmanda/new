import { Component } from '@angular/core';
import { DashboardCard } from '../../../../pages/dashboard/widgets/dashboard-card/dashboard-card';
import { StatusBadge } from '../../status-badge/status-badge/status-badge';
@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [
    DashboardCard,
    StatusBadge
  ],
  templateUrl: './pending-tasks.html',
  styleUrls: ['./pending-tasks.scss'],
})
export class PendingTasks {

}
