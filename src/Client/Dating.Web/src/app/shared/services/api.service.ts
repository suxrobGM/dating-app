import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuid} from 'uuid';
import {AppConfig} from '@configs';
import {catchError, Observable, of} from 'rxjs';
import {Account, Media, ResponseResult} from '@shared/models';


@Injectable()
export class ApiService {
  private readonly host = AppConfig.apiHost;
  private readonly headers: Record<string, string>;
  private readonly blob: S3Client;

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) {
    this.headers = {
      'content-type': 'application/json',
    };

    this.blob = new S3Client({
      credentials: {
        accessKeyId: AppConfig.storage.keyId,
        secretAccessKey: AppConfig.storage.keySecret,
      },
    });
  }

  async uploadImage(file: File): Promise<ResponseResult<Media>> {
    const fileName = `img/${this.generateId()}.jpg`;

    const params = {
      Bucket: AppConfig.storage.bucketName,
      Key: fileName,
      ContentType: file.type,
    };

    try {
      await this.blob.send(new PutObjectCommand(params));
      return {
        success: true,
        value: {
          url: `${AppConfig.storage.bucketUrl}/img/${fileName}`,
          contentType: file.type,
        },
      };
    } catch (error) {
      console.error(`Could not upload image: ${error}`);
      return {success: false};
    }
  }

  createAccount(account: Account): Observable<ResponseResult> {
    const url = `${this.host}/account/create`;
    const body = JSON.stringify(account);

    return this.httpClient
        .post<ResponseResult>(url, body, {headers: this.headers})
        .pipe(catchError((err) => this.handleError(err)));
  }

  parseSortProperty(sortField: string = '', sortOrder: SortOrder = 'ascending'): string {
    if (sortOrder === 'descending') {
      return `-${sortField}`;
    } else {
      return sortField;
    }
  }

  private generateId(): string {
    return uuid().replace('-', '');
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
