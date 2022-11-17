import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AppConfig} from '@configs';
import {catchError, Observable, of} from 'rxjs';
import {
  Account,
  Interest,
  PagedResponseResult,
  ResponseResult,
} from '../models';


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

  createAccount(account: Account): Observable<ResponseResult> {
    const url = `${this.host}/account/create`;
    const body = JSON.stringify(account);

    return this.httpClient
        .post<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  getInterestsList(): Observable<PagedResponseResult<Interest>> {
    const url = `${this.host}/account/create`;

    return this.httpClient
        .get<PagedResponseResult<Interest>>(url)
        .pipe(catchError((err) => this.handleError(err)));
  }

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
    this.messageService.add({key: 'errorMessage', severity: 'error', summary: 'Error', detail: errorMessage});
    console.error(errorMessage ?? responseData);
    return of({error: errorMessage, success: false});
  }
}

type SortOrder = 'ascending' | 'descending';

type ErrorResult = {
  error: string,
  success: boolean,
};
