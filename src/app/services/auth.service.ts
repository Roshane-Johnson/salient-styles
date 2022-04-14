import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserType } from '../enums/user-type';
import { ApiResponse } from '../types/ApiResponse';
import { LoginResponse } from '../types/LoginResponse';
import { RegisterResponse } from '../types/RegisterResponse';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /** Logged in user cache to reduce API calls on app initialization */
  public loggedInUserCache!: User;

  registerUser(signupCredentials: FormData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/signup`,
      signupCredentials
    );
  }

  loginUser(loginCredentials: FormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      loginCredentials
    );
  }

  logoutUser(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/logout`,
      new FormData()
    );
  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  loggedInUser() {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/profile`);
  }

  /**
   * This function returns `true` if the logged in user role is `admin`
   * and `false` is the logged in user role is not an admin
   * @returns A `boolean` if the logged in user is an admin
   */
  loggedInUserIsAdmin(activatedRoute: ActivatedRoute): boolean {
    if (activatedRoute.snapshot.data['resp'].data.role == UserType.ADMIN) {
      return true;
    }

    return false;
  }
}
