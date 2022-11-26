import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAuthenticated: boolean;

  constructor(
    private oidcService: OidcSecurityService,
    private router: Router)
  {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.oidcService.checkAuth().subscribe(({isAuthenticated, userData, accessToken}) => {
      this.isAuthenticated = isAuthenticated;
      // console.log(`Current access token is '${accessToken}'`);
      console.log(userData);
    });

    this.oidcService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
