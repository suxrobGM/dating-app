import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPhotoEditorModule} from 'ngx-photo-editor';
import {SharedModule} from '@shared/index';
import {CreateAccountComponent, LoginComponent} from './pages';
import {CreateAccountService} from './shared';
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
    LoginComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    NgxPhotoEditorModule,
    PrimengModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    CreateAccountService,
  ],
})
export class AccountModule { }
