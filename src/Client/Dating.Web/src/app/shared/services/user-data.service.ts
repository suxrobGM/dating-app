import {Injectable} from '@angular/core';
import {UserIdentity} from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _userData: UserIdentity | null;

  constructor() {
    this._userData = null;
  }

  public setUser(userIdentity: UserIdentity | null) {
    this._userData = userIdentity;
  }

  public getUser(): UserIdentity | null {
    return this._userData;
  }
}
