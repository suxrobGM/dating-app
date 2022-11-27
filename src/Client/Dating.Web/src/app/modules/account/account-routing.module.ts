import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAccountComponent, LoginComponent} from './pages';
import {
  GeneralFormComponent,
  PhotoFormComponent,
  ProfileFormComponent,
} from './components';

const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateAccountComponent,
    data: {
      breadcrumb: 'Create',
    },
    children: [
      {
        path: '',
        redirectTo: 'general-form',
        pathMatch: 'full',
      },
      {
        path: 'general-form',
        component: GeneralFormComponent,
      },
      {
        path: 'profile-form',
        component: ProfileFormComponent,
      },
      {
        path: 'photo-form',
        component: PhotoFormComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
