import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from 'angular-auth-oidc-client';
import {AuthConfig} from '@configs';
import {AuthGuard} from './auth.guard';


@NgModule({
  declarations: [],
  imports: [
    AuthModule.forRoot({config: AuthConfig}),
    CommonModule,
  ],
  exports: [AuthModule],
  providers: [
    AuthGuard,
  ],
})
export class AuthenticationModule { }
