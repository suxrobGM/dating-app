import {Component} from '@angular/core';
import {UserDataService} from '@shared/services';
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
    private userDataService: UserDataService)
  {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.checkAuth();
    this.subscribeEvents();
  }

  private checkAuth() {
    this.oidcService.checkAuth().subscribe(({isAuthenticated, userData, accessToken}) => {
      this.isAuthenticated = isAuthenticated;
      this.userDataService.setUser(userData);
      this.userDataService.setAccessToken(accessToken);
      console.log(userData);
    });
  }

  private subscribeEvents() {
    this.oidcService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.oidcService.userData$.subscribe(({userData}) => {
      this.userDataService.setUser(userData);
    });
  }
}
