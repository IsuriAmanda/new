import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './section-title.html',
  styleUrls: ['./section-title.scss'],
})
export class SectionTitle {

  @Input() title = '';
}
