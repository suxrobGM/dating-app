import {NgModule} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {StepsModule} from 'primeng/steps';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import {GalleriaModule} from 'primeng/galleria';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  exports: [
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    StepsModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    TabViewModule,
    GalleriaModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule { }
