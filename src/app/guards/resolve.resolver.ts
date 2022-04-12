import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../types/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ResolveResolver implements Resolve<ApiResponse> {
  constructor(private _auth: AuthService) {}
  resolve(): Observable<ApiResponse> {
    return this._auth.loggedInUser();
  }
}
