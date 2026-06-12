import { NgModule } from '@angular/core';
import { authGuard } from './core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Login } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Quotations } from './pages/quotations/quotations';
import { Customers } from './pages/customers/customers';
import { Supplies } from './pages/supplies/supplies';
import { Binding } from './pages/supplies/binding/binding';
import { Laminating } from './pages/supplies/laminating/laminating';
import { Printing } from './pages/supplies/printing/printing';
import { Jobs } from './pages/jobs/jobs';
import { Reports } from './pages/reports/reports';
import { QuotationDetails } from './pages/quotations/quotation-create/quotation-details/quotation-details';
import { QuotPrimary } from './pages/quotations/quotation-create/quotation-create';
import { QuotationsList } from './pages/quotations/quotations-list/quotations-list';
import { Sales } from './pages/reports/sales/sales';
import { ReportQuotations } from './pages/reports/quotations/Reportquotations';
import { ReportProduction } from './pages/reports/production/Reportproduction';
import { Users } from './pages/users/users';
import { UserList } from './pages/users/user-list/user-list';
import { CreateUser } from './pages/users/create-user/create-user';
import { UserDetails } from './pages/users/user-details/user-details';
import { EditUser } from './pages/users/edit-user/edit-user';


export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'quotations', component: Quotations },
      { path: 'quotations/quotation-create', component: QuotPrimary },
      { path: 'quotations/quotation-create/quotations-details/:id', component: QuotationDetails },
      { path: 'quotations/quotations-list', component: QuotationsList },
      { path: 'customers', component: Customers },
      { path: 'supplies', component: Supplies },
      { path: 'supplies/binding', component: Binding },
      { path: 'supplies/laminating', component: Laminating },
      { path: 'supplies/printing', component: Printing },
      { path: 'jobs', component: Jobs },
      { path: 'reports', component: Reports },
      { path: 'reports/sales', component: Sales },
      { path: 'reports/quotations', component: ReportQuotations },
      { path: 'reports/production', component: ReportProduction },
      { path: 'users', component: Users },
      { path: 'users/create', component: CreateUser },
      { path: 'users/view', component: UserDetails },
      { path: 'users/edit', component: EditUser },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}