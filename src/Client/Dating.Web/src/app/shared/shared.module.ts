import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService, BlobService} from './services';
import {PrimengModule} from './primeng.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
  ],
  exports: [
    PrimengModule,
  ],
  providers: [
    ApiService,
    BlobService,
  ],
})
export class SharedModule { }
