import {NgModule} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {StepsModule} from 'primeng/steps';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  exports: [
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    StepsModule,
    InputTextModule,
    PasswordModule,
    TabViewModule,
  ],
})
export class PrimengModule { }
