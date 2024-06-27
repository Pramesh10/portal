import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupConfigComponent } from './setup-config.component';
import { NumberSeriesSetupComponent } from '../../setup-config-pages/number-series-setup/number-series-setup.component';
import { BasicSetupComponent } from '../../setup-config-pages/basic-setup/basic-setup.component';
import { NumberSeriesListComponent } from '../../setup-config-pages/number-series-setup/number-series-list/number-series-list/number-series-list.component';

const routes: Routes = [
  {
    path: '',
    component: SetupConfigComponent,
    children: [
      {
        path: '',
        redirectTo: '/number-series-setup',
        pathMatch: 'full',
      },
      {
        path: 'number-series-setup',
        component: NumberSeriesSetupComponent,
      },
      {
        path: 'basic-setup',
        component: BasicSetupComponent,
      },
      {
        path: 'number-series-list',
        component: NumberSeriesListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupConfigRoutingModule { }
