import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';


@NgModule({
  exports: [
    CardModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [
    MessageService,
  ],
})
export class PrimengModule { }
