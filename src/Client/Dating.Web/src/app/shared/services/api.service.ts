import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AppConfig} from '@configs';
import {catchError, Observable, of} from 'rxjs';
import {
  Interest,
  PagedResponseResult,
  Profile,
  ProfilePhoto,
  ResponseResult,
} from '../models';
import {
  CreateAccountCommand,
  DeleteProfilePhotoCommand,
  SetProfileMainPhotoCommand,
  UpdateAccountCommand,
  UpdateProfileCommand,
  UploadProfilePhotoCommand,
} from '../models/commands';


@Injectable()
export class ApiService {
  private readonly host = AppConfig.apiHost;
  private readonly headers: Record<string, string>;

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) {
    this.headers = {
      'content-type': 'application/json',
    };
  }


  // #region Account API

  userExists(email: string): Observable<ResponseResult<boolean>> {
    const url = `${this.host}/account/exists?email=${email}`;

    return this.httpClient
        .get<ResponseResult<boolean>>(url, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  createAccount(account: CreateAccountCommand): Observable<ResponseResult> {
    const url = `${this.host}/account/create`;
    const body = JSON.stringify(account);

    return this.httpClient
        .post<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  updateAccount(command: UpdateAccountCommand): Observable<ResponseResult> {
    const url = `${this.host}/account/update/${command.id}`;
    const body = JSON.stringify(command);

    return this.httpClient
        .put<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  // #endregion


  // #region Interest API

  getInterestsList(): Observable<PagedResponseResult<Interest>> {
    const url = `${this.host}/interest/list`;

    return this.httpClient
        .get<PagedResponseResult<Interest>>(url, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  getUserInterests(userId: string): Observable<ResponseResult<Interest[]>> {
    const url = `${this.host}/interest/user/${userId}`;

    return this.httpClient
        .get<ResponseResult<Interest[]>>(url, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  // #endregion


  // #region Profile API

  getUserProfile(userId: string): Observable<ResponseResult<Profile>> {
    const url = `${this.host}/profile/${userId}`;

    return this.httpClient
        .get<ResponseResult<Profile>>(url)
        .pipe(catchError((err) => this.handleError(err)));
  }

  getProfilePhotos(userId: string): Observable<ResponseResult<ProfilePhoto[]>> {
    const url = `${this.host}/profile/photo/${userId}`;

    return this.httpClient
        .get<ResponseResult<ProfilePhoto[]>>(url, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  uploadProfilePhoto(command: UploadProfilePhotoCommand): Observable<ResponseResult<ProfilePhoto>> {
    const url = `${this.host}/profile/photo`;
    const body = JSON.stringify(command);

    return this.httpClient
        .post<ResponseResult<ProfilePhoto>>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  setProfileMainPhoto(command: SetProfileMainPhotoCommand): Observable<ResponseResult> {
    const url = `${this.host}/profile/photo/setMainPhoto`;
    const body = JSON.stringify(command);

    return this.httpClient
        .put<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  deleteProfilePhoto(command: DeleteProfilePhotoCommand): Observable<ResponseResult> {
    const url = `${this.host}/profile/photo/delete`;
    const body = JSON.stringify(command);

    return this.httpClient
        .put<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  updateProfile(command: UpdateProfileCommand): Observable<ResponseResult> {
    const url = `${this.host}/profile/update/${command.id}`;
    const body = JSON.stringify(command);

    return this.httpClient
        .put<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  // #endregion


  parseSortProperty(sortField: string = '', sortOrder: SortOrder = 'ascending'): string {
    if (sortOrder === 'descending') {
      return `-${sortField}`;
    } else {
      return sortField;
    }
  }

  private handleError(responseData: any): Observable<ErrorResult> {
    const errorMessage = responseData.error?.error ?? responseData.error;

    this.messageService.add({key: 'notification', severity: 'error', summary: 'Error', detail: errorMessage});
    console.error(errorMessage ?? responseData);
    return of({error: errorMessage, success: false});
  }
}

type SortOrder = 'ascending' | 'descending';

type ErrorResult = {
  error: string,
  success: boolean,
};
