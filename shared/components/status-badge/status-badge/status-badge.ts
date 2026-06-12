import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
 @Input() label = '';

  @Input() type:
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral' = 'info';


}
