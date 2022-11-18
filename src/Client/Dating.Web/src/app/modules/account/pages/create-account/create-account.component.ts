import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateAccountComponent implements OnInit {
  public readonly registrationSteps: MenuItem[];
  private readonly stepsCount: number;
  private activeStep = 0;

  constructor(private router: Router) {
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

    this.stepsCount = this.registrationSteps.length - 1;
  }

  ngOnInit(): void {
    const isGeneralForm = this.router.url.endsWith('/general-form');

    if (!isGeneralForm) {
      this.navigateToStep(0);
    }
  }

  next() {
    if (this.activeStep >= this.stepsCount) {
      return;
    }

    this.activeStep++;
    this.navigateToStep(this.activeStep);
  }

  back() {
    if (this.activeStep <= 0) {
      return;
    }

    this.activeStep--;
    this.navigateToStep(this.activeStep);
  }

  canGoNext(): boolean {
    return this.activeStep < this.stepsCount;
  }

  canGoBack(): boolean {
    return this.activeStep > 0;
  }

  private navigateToStep(index: number) {
    const stepLink = this.registrationSteps[index].routerLink;
    this.router.navigateByUrl(`/account/create/${stepLink}`);
  }
}
