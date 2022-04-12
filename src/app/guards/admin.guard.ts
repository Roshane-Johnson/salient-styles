import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private route: Router, private _auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.loggedIn()) {
      return true;
    }

    return false;
  }
}
