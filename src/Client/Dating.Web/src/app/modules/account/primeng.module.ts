import {NgModule} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {StepsModule} from 'primeng/steps';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  exports: [
    CalendarModule,
    DropdownModule,
    StepsModule,
    InputTextModule,
    PasswordModule,
  ],
})
export class PrimengModule { }
