import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPhotoEditorModule} from 'ngx-photo-editor';
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
    AccountRoutingModule,
    CommonModule,
    NgxPhotoEditorModule,
    PrimengModule,
    SharedModule,
  ],
})
export class AccountModule { }
