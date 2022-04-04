import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private http: HttpClient) {}

  getAuthUserInfo() {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/profile`);
  }
}
