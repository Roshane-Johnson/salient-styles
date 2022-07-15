import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserType } from '../enums/user-type';
import { ApiResponse } from '../types/ApiResponse';
import { LoginResponse } from '../types/LoginResponse';
import { RegisterResponse } from '../types/RegisterResponse';
import { User } from '../types/User';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	//TODO Implement logged in user cache to reduce API calls on app initialization
	public loggedInUserCache!: User;

	/**
	 * Registers the user with the `signupCredentials`
	 * @param signupCredentials The users signup information
	 */
	registerUser(signupCredentials: FormData): Observable<RegisterResponse> {
		return this.http.post<RegisterResponse>(`${environment.apiUrl}/signup`, signupCredentials);
	}

	/**
	 * Login the user with the `loginCredentials`
	 * @param loginCredentials The users login information
	 */
	loginUser(loginCredentials: FormData): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, loginCredentials);
	}

	/**
	 * Logout the user currently logged in
	 */
	logoutUser(): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.apiUrl}/logout`, new FormData());
	}

	/**
	 * Checks if the user is logged in
	 * @returns `true` if the user is logged in
	 */
	loggedIn(): boolean {
		if (localStorage.getItem('token')) {
			return true;
		}

		return false;
	}

	/**
	 * Gets the user thats currently logged in
	 */
	loggedInUser(): Observable<ApiResponse> {
		return this.http.get<ApiResponse>(`${environment.apiUrl}/profile`).pipe(shareReplay());
	}

	/**
	 * This function returns `true` if the logged in user role is `admin`
	 * and `false` is the logged in user role is not an admin
	 * @returns `true` if the logged in user is an admin
	 */
	loggedInUserIsAdmin(activatedRoute: ActivatedRoute): boolean {
		if (activatedRoute.snapshot.data['resp'].data.role == UserType.ADMIN) {
			return true;
		}

		return false;
	}
}
