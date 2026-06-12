import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from'../dashboard-card/dashboard-card';
import { ProgressBar } from '../shared/progress-bar/progress-bar';
import { SectionTitle } from '../shared/section-title/section-title';

@Component({
  selector: 'app-machine-utilization',
  standalone: true,
  imports: [
    DashboardCard, 
    ProgressBar,
    CommonModule,
    SectionTitle
  ],
  templateUrl: './machine-utilization.html',
  styleUrls: ['./machine-utilization.scss'],
})
export class MachineUtilization {
 machines = [
    {
      name: 'Offset Printer 01',
      utilization: 78
    },

    {
      name: 'Binding Machine',
      utilization: 52
    },

    {
      name: 'Lamination Machine',
      utilization: 34
    }
  ];
}
