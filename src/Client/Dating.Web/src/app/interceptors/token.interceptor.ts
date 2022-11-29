import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDataService} from '@shared/services';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userDataService: UserDataService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userDataService.getAccessToken();
    const headers = {Authorization: ''};

    if (token == null) {
      return next.handle(request);
    }

    if (!request.headers.get('bypassAuthorization')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const newRequest = request.clone({
      setHeaders: headers,
    });

    return next.handle(newRequest);
  }
}
