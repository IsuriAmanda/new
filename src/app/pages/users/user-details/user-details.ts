import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.scss'],
})
export class UserDetails {
  user = {
    id: 'U-003',
    name: 'Kavindu Silva',
    email: 'kavindu@harshanaprinters.lk',
    phone: '077 456 7890',
    role: 'Operator',
    department: 'Printing',
    status: 'Active',
    joinedDate: '2026-02-14',
    lastLogin: '2026-05-29',
  };

  activityRows = [
    { date: '2026-05-31', action: 'Updated job stage', detail: 'J-0389 moved to Printing' },
    { date: '2026-05-29', action: 'Completed task', detail: 'Printed booklet batch for Q-1022' },
    { date: '2026-05-28', action: 'Read notification', detail: 'New job assigned notification' },
  ];
}
