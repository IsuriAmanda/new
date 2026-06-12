import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  isMobile = false;
  activeModule = 'dashboard';
isHandset$: Observable<unknown> | Subscribable<unknown> | PromiseLike<unknown> | undefined;
topNavLinks: any;
allMenuItems: any;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {

    // RESPONSIVE OBSERVER (BEST PRACTICE)
    this.breakpointObserver
      .observe(['(max-width: 900px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    // ROUTE DETECTION
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.setActiveModule(event.urlAfterRedirects);
      });

    this.setActiveModule(this.router.url);
  }

  menuMap: any = {

    dashboard: [
      { name: 'Overview', link: '/' },
      { name: 'Notifications', link: '/dashboard/notifications' },
    
    ],

    quotations: [
      
      { name: 'History', link: '/quotations/quotations-list' },
      { name: 'Create Quote', link: '/quotations' }
    ],


    supplies: [
     { name: 'Materials',        link: '/supplies' },
      { name: 'Lamination',       link: '/supplies/laminating'},
      { name: 'Binding Supplies', link: '/supplies/binding'   },
      { name: 'Printing Supplies', link: '/supplies/printing'   }
    ],

    customers: [
      { name: 'Customer List', link: '/customers'     }
    ],

    jobs: [
      { name: 'Job List',       link: '/jobs'           }
    ],
    reports: [
      { name: 'Reports Overview',    link: '/reports'    },
      { name: 'Inventory Reports', link: '/reports/inventory' }
    ]

  };

  get menuItems() {
    return this.menuMap[this.activeModule];
  }

  setActiveModule(url: string) {

    const path = url.split('/')[1];

    switch (path) {

        case 'reports':
        this.activeModule = 'reports';
        break;

      case 'quotations':
        this.activeModule = 'quotations';
        break;

      case 'supplies':
        this.activeModule = 'supplies';
        break;

      case 'customers':
        this.activeModule = 'customers';
        break;

      case 'jobs':
        this.activeModule = 'jobs';
        break;

      default:
        this.activeModule = 'dashboard';

    }
  }

}