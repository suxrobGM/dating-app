import {Injectable} from '@angular/core';
import {UserIdentity} from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: UserIdentity | null;
  private accessToken: string | null;

  constructor() {
    this.accessToken = null;
    this.userData = null;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getUser(): UserIdentity | null {
    return this.userData;
  }

  setUser(userIdentity: UserIdentity) {
    this.userData = userIdentity;
  }

  getUserId(): string | null {
    return this.userData?.sub ?? null;
  }
}
