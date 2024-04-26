import { Routes } from '@angular/router';
import { LoginComponent } from './layout/auth/login/login/login.component';
import { MainLayoutComponent } from './layout/admin/main-layout/main-layout.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component :LoginComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/admin/main-layout/main-layout.module').then(
        (m) => m.MainLayoutModule
      ),
  },
];
