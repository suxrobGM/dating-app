import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private oidcService: OidcSecurityService) {
  }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.oidcService.logoff();
  }
}
