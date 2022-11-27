import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateAccountComponent implements OnInit {
  public readonly registrationSteps: MenuItem[];

  constructor(
    private oidcService: OidcSecurityService,
    private router: Router)
  {
    this.registrationSteps = [
      {
        label: 'General',
        routerLink: 'general-form',
      },
      {
        label: 'Profile',
        routerLink: 'profile-form',
      },
      {
        label: 'Photo',
        routerLink: 'photo-form',
      },
    ];
  }

  ngOnInit(): void {
    this.checkAuthState();
    this.checkFormStep();
  }

  private checkFormStep() {
    const isGeneralForm = this.router.url.endsWith('/general-form');

    if (!isGeneralForm) {
      this.router.navigateByUrl(`/account/create/general-form`);
    }
  }

  private checkAuthState() {
    this.oidcService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
  }
}
