import {
  Component, OnDestroy, AfterViewInit, inject,
  signal, computed, ViewChild, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject, of } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

export interface MenuItem {
  name: string;
  link: string;
  icon?: string;
  isHeader?: boolean;
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: Date;
}

export type ModuleKey =
  | 'dashboard' | 'quotations' | 'supplies'
  | 'customers' | 'jobs' | 'reports' | 'users';

const VALID_MODULES = new Set<ModuleKey>([
  'quotations', 'supplies', 'customers', 'jobs', 'reports', 'users',
]);

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule,
    MatListModule, MatIconModule, MatMenuModule,
    MatBadgeModule, MatTooltipModule, MatDividerModule,
  ],
})
export class MainLayoutComponent implements OnDestroy, AfterViewInit {

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router             = inject(Router);
  private readonly authService        = inject(AuthService);
  private readonly platformId         = inject(PLATFORM_ID);        

  @ViewChild('drawer') drawer!: MatSidenav;

  readonly currentUser = computed(() => this.authService.getUser());

  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  ngAfterViewInit(): void {
   this.isHandset$.pipe(takeUntil(this.destroy$))
    .subscribe(isHandset => {
      if (isHandset) {
        this.drawer.close();
      } else {
        this.drawer.open();
      }
    });
    this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    takeUntil(this.destroy$),
  ).subscribe(() => {
    if (this.drawer?.mode === 'over') {  // only close on mobile (over mode)
      this.drawer.close();
    }
  });
  }


  readonly isHandset$: Observable<boolean> = isPlatformBrowser(this.platformId)
    ? this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(r => r.matches),
        shareReplay(1),
      )
    : of(false);

  readonly activeModule = signal<ModuleKey>('dashboard');

  private readonly menuMap: Record<ModuleKey, MenuItem[]> = {
    dashboard:  [{ name: 'Overview', link: '/', icon: 'dashboard' }],
    quotations: [
      { name: 'Quotation History', link: '/quotations',                  icon: 'history'   },
      { name: 'Create Quote',      link: '/quotations/quotation-create', icon: 'post_add'  },
    ],
    supplies: [
      { name: 'Materials',         link: '/supplies',           icon: 'inventory_2' },
      { name: 'Lamination',        link: '/supplies/laminating', icon: 'layers'      },
      { name: 'Binding Supplies',  link: '/supplies/binding',   icon: 'book'        },
      { name: 'Printing Supplies', link: '/supplies/printing',  icon: 'print'       },
    ],
    customers: [{ name: 'Customer List',   link: '/customers', icon: 'people'         }],
    jobs:      [{ name: 'Job List',        link: '/jobs',      icon: 'work'           }],
    reports: [
      { name: 'Reports Overview',  link: '/reports',            icon: 'bar_chart'              },
      { name: 'Quotation Report',  link: '/reports/quotations', icon: 'request_quote'          },
      { name: 'Production Report', link: '/reports/production', icon: 'precision_manufacturing'},
      { name: 'Revenue Summary',   link: '/reports/sales',      icon: 'payments'               },
    ],
    users: [
      { name: 'User Management', link: '/users',        icon: 'manage_accounts' },
      { name: 'Create User',     link: '/users/create', icon: 'person_add'      },
    ],
  };

  readonly menuItems = computed<MenuItem[]>(() => this.menuMap[this.activeModule()] ?? []);

  readonly allMenuItems = computed<MenuItem[]>(() =>
    Object.entries(this.menuMap).flatMap(([section, items]) => {
      if (section === 'users' && this.currentUser()?.role !== 'Admin') return [];
      return [
        { name: section.toUpperCase(), link: '', isHeader: true },
        ...items,
      ];
    })
  );

  readonly topNavLinks = [
    { name: 'Dashboard',  link: '/',          exact: true  },
    { name: 'Quotations', link: '/quotations', exact: false },
    { name: 'Supplies',   link: '/supplies',   exact: false },
    { name: 'Customers',  link: '/customers',  exact: false },
    { name: 'Jobs',       link: '/jobs',       exact: false },
    { name: 'Reports',    link: '/reports',    exact: false },
    { name: 'Users',      link: '/users',      exact: false },
  ];

  showNotifications = false;
  notifications: Notification[] = [
    { id: 1, message: 'JT12 assigned to Cutting', read: false, timestamp: new Date() },
    { id: 2, message: 'Quotation QN5 approved',   read: false, timestamp: new Date() },
    { id: 3, message: 'Job delayed: JT8',          read: false, timestamp: new Date() },
  ];

  get unreadCount() { return this.notifications.filter(n => !n.read).length; }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications)
      this.notifications = this.notifications.map(n => ({ ...n, read: true }));
  }

  toggleDrawer(): void  { if (this.drawer) this.drawer.toggle(); }
  closeDrawer(): void   { if (this.drawer?.opened) this.drawer.close(); }

  trackByLink(_i: number, item: MenuItem)           { return item.link; }
  trackByNotificationId(_i: number, n: Notification){ return n.id; }

  constructor() {
    this.updateActiveModule(this.router.url);

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(e => this.updateActiveModule(e.urlAfterRedirects));

    
  }

  private updateActiveModule(url: string): void {
    const seg = url.split('?')[0].split('#')[0].split('/')[1] as ModuleKey;
    this.activeModule.set(VALID_MODULES.has(seg) ? seg : 'dashboard');
  }
}