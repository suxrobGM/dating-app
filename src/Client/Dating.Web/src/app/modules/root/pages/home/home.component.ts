import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private oidcService: OidcSecurityService,
    private router: Router)
  {
  }

  ngOnInit(): void {
    this.oidcService.isAuthenticated()
        .subscribe((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/account/login');
          }
        });
  }
}
