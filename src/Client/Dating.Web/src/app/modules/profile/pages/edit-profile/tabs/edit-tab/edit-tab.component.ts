import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {UpdateProfileCommand} from '@shared/models/commands';
import {ApiService, UserDataService} from '@shared/services';
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
  public isBusy: boolean;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private userDataService: UserDataService)
  {
    this.isBusy = false;
    this.genderValues = EnumUtils.getEnumValues(Gender);
    this.orientationValues = EnumUtils.getEnumValues(SexualOrientation);

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl(Gender.Male, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      livingCity: new FormControl('', Validators.required),
      orientation: new FormControl(SexualOrientation.Straight, Validators.required),
      school: new FormControl(''),
      jobTitle: new FormControl(''),
      company: new FormControl(''),
      bio: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  submit() {
    const form = this.form.value;
    const id = this.userDataService.getUserId();

    const profile: UpdateProfileCommand = {
      id: id!,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      birthdate: form.birthdate,
      livingCity: form.livingCity,
      orientation: form.orientation,
      school: form.school,
      jobTitle: form.jobTitle,
      company: form.company,
      bio: form.bio,
    };

    this.isBusy = true;

    this.apiService.updateProfile(profile).subscribe((result) => {
      if (result.success) {
        this.messageService.add({
          severity: 'success',
          key: 'formMessage',
          summary: 'Success',
          detail: 'Profile data has been updated successfully',
        });
      }
      else {
        this.messageService.add({
          severity: 'error',
          key: 'formMessage',
          summary: 'Error',
          detail: 'Could not update the profile data',
        });
      }

      this.isBusy = false;
    });
  }

  private fetchUserProfile() {
    const userId = this.userDataService.getUserId();

    if (!userId) {
      return;
    }

    this.isBusy = true;

    this.apiService.getUserProfile(userId).subscribe((result) => {
      if (result.success) {
        const profile = result.value!;

        this.form.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender,
          birthdate: new Date(profile.birthdate!),
          livingCity: profile.livingCity,
          orientation: profile.orientation,
          school: profile.school,
          jobTitle: profile.jobTitle,
          company: profile.company,
          bio: profile.bio,
        });
      }

      this.isBusy = false;
    });
  }
}
