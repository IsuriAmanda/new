import { Component } from '@angular/core';
import { DashboardCard } from'../dashboard-card/dashboard-card';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge/status-badge';

@Component({
  selector: 'app-notifications-panel',
  standalone: true,
  imports: [
    DashboardCard,
    StatusBadge,
  ],
  templateUrl: './notifications-panel.html',
  styleUrls: ['./notifications-panel.scss'],
})
export class NotificationsPanel {

}
