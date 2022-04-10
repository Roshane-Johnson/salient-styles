import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this._auth.loggedIn();

    if (isLoggedIn) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
