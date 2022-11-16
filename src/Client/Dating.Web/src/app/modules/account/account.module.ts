import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateAccountComponent} from './pages';
import {AccountRoutingModule} from './account-routing.module';
import {SharedModule} from '@shared/index';
import {PrimengModule} from './primeng.module';
import {
  GeneralFormComponent,
  PhotoFormComponent,
  ProfileFormComponent,
} from './components';


@NgModule({
  declarations: [
    CreateAccountComponent,
    GeneralFormComponent,
    PhotoFormComponent,
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    PrimengModule,
  ],
})
export class AccountModule { }
