import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private oidcService: OidcSecurityService,
    private router: Router)
  {
  }

  ngOnInit(): void {
    this.checkAuthState();
  }

  login() {
    this.oidcService.authorize();
  }

  private checkAuthState() {
    this.oidcService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
  }
}
