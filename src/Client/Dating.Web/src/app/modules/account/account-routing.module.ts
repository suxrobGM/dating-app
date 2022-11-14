import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAccountComponent} from './pages';

const rootRoutes: Routes = [
  {
    path: 'create',
    component: CreateAccountComponent,
    data: {
      breadcrumb: 'Create',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
