import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateAccountComponent} from './pages';
import {AccountRoutingModule} from './account-routing.module';


@NgModule({
  declarations: [
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
})
export class AccountModule { }
