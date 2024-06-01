import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from '../../../pages/test-list/test-list.component';
import { LoginComponent } from '../../auth/login/login/login.component';
import { MainLayoutComponent } from './main-layout.component';
import { UserProfileComponent } from '../../../pages/user-profile/user-profile.component';
import { PrimengTableComponent } from '../../../pages/primeng-table/primeng-table.component';
import { CalendarEventsComponent } from '../../../pages/calendar-events/calendar-events.component';
import { SalesinvoiceComponent } from '../../../pages/salesinvoice/salesinvoice.component';
import { DashboardComponent } from '../../../pages/dashboard/dashboard.component';
import { SalesInvoiceBillingComponent } from '../../../pages/sales-invoice-billing/sales-invoice-billing.component';
import { SalesInoiceReceiptPrintComponent } from '../../../receipt-print/sales-inoice-receipt-print/sales-inoice-receipt-print.component';

// const routes: Routes = [
//   {
//     path: "login", component: LoginComponent,
//   },
//   {
//     path: "test", component: TestListComponent,
//   }
// ];
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/test',
        pathMatch: 'full',
      },
      {
        path: 'test',
        component: TestListComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'salesinvoice/:invoiceType',
        component: SalesinvoiceComponent,
      },
      {
        path: 'salesinvoicebilling',
        component: SalesInvoiceBillingComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'primengtable',
        component: PrimengTableComponent,
      },
      {
        path: 'calendar',
        component: CalendarEventsComponent,
      },
      {
        path: 'salesinvoiceprint',
        component: SalesInoiceReceiptPrintComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
