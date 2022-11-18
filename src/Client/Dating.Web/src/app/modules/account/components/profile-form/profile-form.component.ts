import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateAccountService} from '@modules/account/shared';
import {EnumType, Gender, SexualOrientation} from '@shared/types';
import {EnumUtils} from '@shared/utils';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  public readonly genderValues: EnumType[];
  public readonly orientationValues: EnumType[];
  public readonly form: FormGroup;

  constructor(
    private createAccountService: CreateAccountService,
    private router: Router)
  {
    this.genderValues = EnumUtils.getEnumValues(Gender);
    this.orientationValues = EnumUtils.getEnumValues(SexualOrientation);

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl(Gender.Male, Validators.required),
      birthdate: new FormControl('', Validators.required),
      livingCity: new FormControl('', Validators.required),
      orientation: new FormControl(SexualOrientation.Straight, Validators.required),
    });
  }

  ngOnInit(): void {
    const profile = this.createAccountService.getAccount().profile;

    if (!profile) {
      return;
    }

    this.form.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      birthdate: profile.birthdate,
      livingCity: profile.livingCity,
      orientation: profile.orientation,
    });
  }

  isRequired(propertyName: string): boolean {
    const property = this.form.get(propertyName);
    return property && property.getError('required');
  }

  prevPage() {
    this.router.navigateByUrl('/account/create/general-form');
  }

  nextPage() {
    if (!this.form.valid) {
      return;
    }

    const form = this.form.value;

    this.createAccountService.setProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      birthdate: form.birthdate,
      livingCity: form.livingCity,
      orientation: form.orientation,
    });

    this.router.navigateByUrl('/account/create/photo-form');
  }
}
