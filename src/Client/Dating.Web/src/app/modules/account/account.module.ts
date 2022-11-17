import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/index';
import {CreateAccountComponent} from './pages';
import {AccountRoutingModule} from './account-routing.module';
import {PrimengModule} from './primeng.module';
import {
  GeneralFormComponent,
  InterestsFormComponent,
  PhotoFormComponent,
  ProfileFormComponent,
} from './components';


@NgModule({
  declarations: [
    CreateAccountComponent,
    GeneralFormComponent,
    InterestsFormComponent,
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
