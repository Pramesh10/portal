import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from '../../../pages/test-list/test-list.component';
import { LoginComponent } from '../../auth/login/login/login.component';
import { MainLayoutComponent } from './main-layout.component';
import { UserProfileComponent } from '../../../pages/user-profile/user-profile.component';

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
        path: 'user-profile',
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
