import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAccountComponent} from './pages';
import {
  GeneralFormComponent,
  PhotoFormComponent,
  ProfileFormComponent,
} from './components';

const rootRoutes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
