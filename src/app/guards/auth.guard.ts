import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      console.log(this._activatedRoute.snapshot.data);
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
