import {  Component,  computed,  inject}from '@angular/core';
import { CommonModule }from '@angular/common';
import { JobService }from '../../../../core/services/job.service';

import { AuthService }from '../../../../core/services/auth.service';

//import { NotificationService }from '../../../../core/services/notification.service';

@Component({
  selector: 'app-operator-dashboard',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './operator-dashboard.html',

  styleUrls: [
    './operator-dashboard.scss'
  ]
})
export class OperatorDashboard {



  private jobService = inject(JobService);

  private authService = inject(AuthService);

  // private notificationService =  inject(NotificationService);



  readonly currentUser = this.authService.getUser();

  readonly jobs = this.jobService.jobs;

  // readonly notifications = this.notificationService .notifications;



  readonly assignedJobs = computed(() => this.jobs().filter(job => (job as any).assignedDepartment ===
        this.currentUser?.fullName

      )

    );



  readonly pendingJobs =
    computed(() =>

      this.assignedJobs()
        .filter(job => {
          const status = job.status as string | undefined;
          return status !== 'Completed';
        }).length

    );



  readonly completedJobs =
    computed(() =>

      this.assignedJobs()
        .filter(job => {

          const status = job.status as string | undefined;
          return status === 'Completed';

        }).length

    );


  readonly delayedJobs =
    computed(() => {

      const now = new Date();

      return this.assignedJobs()
        .filter(job => {

          const dueDateValue = job.due_date;
          const dueDate = dueDateValue ? new Date(dueDateValue) : null;
          const status = job.status as string | undefined;

          return dueDate !== null && dueDate < now && status !== 'Completed';

        }).length;

    });


 /* readonly userNotifications =
    computed(() =>

      this.notifications()
        .filter(notification =>

          notification.userId ===
          this.currentUser()?.id

        )

    );*/

}