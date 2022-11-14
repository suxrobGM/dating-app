import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RootRoutingModule} from './root-routing.module';
import {
  Error404Component,
  UnauthorizedComponent,
  ForbiddenComponent,
  HomeComponent,
} from './pages';


@NgModule({
  declarations: [
    Error404Component,
    ForbiddenComponent,
    UnauthorizedComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
  ],
})
export class RootModule { }
