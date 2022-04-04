import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get<ApiResponse>(`${environment.apiUrl}/profile`)
    //   .subscribe((resp: ApiResponse) => {
    //     this.currentUser = resp.data;
    //   });
  }
}
