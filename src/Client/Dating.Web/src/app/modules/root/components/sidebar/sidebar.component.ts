import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private oidcService: OidcSecurityService)
  {
  }

  ngOnInit(): void {
  }

  logout() {
    this.oidcService.logoff();
  }
}
