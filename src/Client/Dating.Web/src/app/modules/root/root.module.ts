import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared';
import {RootRoutingModule} from './root-routing.module';
import {BottombarComponent, SidebarComponent} from './components';
import {PrimengModule} from './primeng.module';
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
    SidebarComponent,
    BottombarComponent,
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    SharedModule,
    PrimengModule,
  ],
  exports: [
    SidebarComponent,
    BottombarComponent,
  ],
})
export class RootModule { }
