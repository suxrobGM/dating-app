import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from '@modules/auth';
import {RootModule} from '@modules/root';
import {SharedModule} from '@shared/index';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InterecptorsModule} from './interceptors';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule,
    InterecptorsModule,
    RootModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
