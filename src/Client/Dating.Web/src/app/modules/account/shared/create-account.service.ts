import {Injectable} from '@angular/core';
import {Account, Profile} from '@shared/models';

@Injectable()
export class CreateAccountService {
  private readonly account: Account;

  constructor() {
    this.account = {email: ''};
  }

  setAccountCredentials(email: string, password: string) {
    this.account.email = email;
    this.account.password = password;
  }

  setProfile(profile: Profile) {
    this.account.profile = profile;
  }

  setMainPhoto(photoUrl: string) {
    if (this.account.profile) {
      this.account.profile.mainPhotoUrl = photoUrl;
    }
  }

  getAccount(): Account {
    return this.account;
  }
}
