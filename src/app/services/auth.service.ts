import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/ApiResponse';
import { LoginResponse } from '../types/LoginResponse';
import { RegisterResponse } from '../types/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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

  /**
   * This function returns the logged in user
   * @returns An `User` with the logged in user
   */
  loggedInUser() {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/profile`);
  }

  /**
   * This function returns the logged in user type
   * check if the a user is logged in first via `AuthService.loggedIn()` before usage
   * @returns A `string` with the logged in user type
   */
  loggedInUserType() {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/profile`);
  }
}
