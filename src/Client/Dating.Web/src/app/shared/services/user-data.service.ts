import {Injectable} from '@angular/core';
import {UserData, User} from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private user: User | null;
  private accessToken: string | null;

  constructor() {
    this.accessToken = null;
    this.user = null;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getUser(): User | null {
    return this.user;
  }

  setUser(user: UserData) {
    if (user?.sub == null) {
      return;
    }

    this.user = {
      id: user.sub,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePhoto: user.picture,
    };
  }

  updateUser(user: User) {
    if (this.user == null) {
      this.user = user;
      return;
    }

    if (user.firstName) {
      this.user.firstName = user.firstName;
    }
    if (user.lastName) {
      this.user.lastName = user.lastName;
    }
    if (user.profilePhoto) {
      this.user.profilePhoto = user.profilePhoto;
    }
  }

  getUserId(): string | null {
    return this.user?.id ?? null;
  }
}
