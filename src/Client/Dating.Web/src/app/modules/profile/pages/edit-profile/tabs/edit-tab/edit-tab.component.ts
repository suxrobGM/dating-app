import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EnumType, Gender, SexualOrientation} from '@shared/types';
import {EnumUtils} from '@shared/utils';


@Component({
  selector: 'app-edit-tab',
  templateUrl: './edit-tab.component.html',
  styleUrls: ['./edit-tab.component.scss'],
})
export class EditTabComponent implements OnInit {
  public readonly genderValues: EnumType[];
  public readonly orientationValues: EnumType[];
  public readonly form: FormGroup;

  constructor() {
    this.genderValues = EnumUtils.getEnumValues(Gender);
    this.orientationValues = EnumUtils.getEnumValues(SexualOrientation);

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl(Gender.Male, Validators.required),
      birthdate: new FormControl('', Validators.required),
      livingCity: new FormControl('', Validators.required),
      orientation: new FormControl(SexualOrientation.Straight, Validators.required),
      school: new FormControl(''),
      jobTitle: new FormControl(''),
      company: new FormControl(''),
      bio: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  submit() {

  }
}
