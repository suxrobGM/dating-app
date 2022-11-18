import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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

  constructor(private router: Router) {
    this.genderValues = EnumUtils.getEnumValues(Gender);
    this.orientationValues = EnumUtils.getEnumValues(SexualOrientation);

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      livingCity: new FormControl('', Validators.required),
      orientation: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  prevPage() {
    this.router.navigateByUrl('/account/create/general-form');
  }

  nextPage() {
    this.router.navigateByUrl('/account/create/photo-form');
  }
}
