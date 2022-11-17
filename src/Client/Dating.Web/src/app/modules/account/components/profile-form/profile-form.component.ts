import {Component, OnInit} from '@angular/core';
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

  constructor() {
    this.genderValues = EnumUtils.getEnumValues(Gender);
    this.orientationValues = EnumUtils.getEnumValues(SexualOrientation);
  }

  ngOnInit(): void {
  }
}
