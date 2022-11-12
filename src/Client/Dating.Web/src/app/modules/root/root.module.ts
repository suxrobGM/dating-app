import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Error404Component} from './pages/error404/error404.component';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {HomeComponent} from './pages/home/home.component';


@NgModule({
  declarations: [
    Error404Component,
    ForbiddenComponent,
    UnauthorizedComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class RootModule { }
