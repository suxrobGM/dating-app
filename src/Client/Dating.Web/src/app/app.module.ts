import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthenticationModule} from '@modules/auth';
import {RootModule} from '@modules/root';
import {SharedModule} from '@shared/index';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    RootModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
