import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService, BlobService} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ApiService,
    BlobService,
  ],
})
export class SharedModule { }
