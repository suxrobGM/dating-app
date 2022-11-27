import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPhotoEditorModule} from 'ngx-photo-editor';
import {SharedModule} from '@shared';
import {PrimengModule} from './primeng.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {
  EditProfileComponent,
  EditTabComponent,
  InterestsTabComponent,
  PhotosTabComponent,
  SecurityTabComponent,
} from './pages';


@NgModule({
  declarations: [
    EditProfileComponent,
    EditTabComponent,
    InterestsTabComponent,
    PhotosTabComponent,
    SecurityTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPhotoEditorModule,
    PrimengModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule { }
