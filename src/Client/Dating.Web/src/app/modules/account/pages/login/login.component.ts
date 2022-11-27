import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private oidcService: OidcSecurityService)
  {
  }

  ngOnInit(): void {
  }

  login() {
    this.oidcService.authorize();
  }
}
