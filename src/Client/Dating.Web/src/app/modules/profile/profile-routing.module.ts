import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  EditProfileComponent,
  EditTabComponent,
  InterestsTabComponent,
  PhotosTabComponent,
  SecurityTabComponent,
} from './pages';

const rootRoutes: Routes = [
  {
    path: '',
    component: EditProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: EditTabComponent,
      },
      {
        path: 'interests',
        component: InterestsTabComponent,
      },
      {
        path: 'photos',
        component: PhotosTabComponent,
      },
      {
        path: 'security',
        component: SecurityTabComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
