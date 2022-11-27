import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPhotoEditorModule} from 'ngx-photo-editor';
import {SharedModule} from '@shared/index';
import {CreateAccountService} from './shared';
import {AccountRoutingModule} from './account-routing.module';
import {PrimengModule} from './primeng.module';
import {
  CreateAccountComponent,
  LoginComponent,
  GeneralFormComponent,
  PhotoFormComponent,
  ProfileFormComponent,
} from './pages';


@NgModule({
  declarations: [
    CreateAccountComponent,
    GeneralFormComponent,
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
