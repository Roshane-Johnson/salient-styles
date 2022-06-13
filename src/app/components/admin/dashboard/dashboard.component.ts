import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalGradients: number | undefined;
  totalUsers: number | undefined;

  constructor(private http: HttpClient, private _util: SharedUtilsService) {
    this.http
      .get<ApiResponse>(`${environment.apiUrl}/gradients/total`)
      .subscribe({
        next: (resp: ApiResponse) => {
          this.totalGradients = resp.data;
        },
        error: (error: HttpErrorResponse) => {
          this._util.devlog(error.error);
        },
      });

    this.http.get<ApiResponse>(`${environment.apiUrl}/users/total`).subscribe({
      next: (resp: ApiResponse) => {
        this.totalUsers = resp.data;
      },
      error: (error: HttpErrorResponse) => {
        this._util.devlog(error.error);
      },
    });
  }

  ngOnInit(): void {}
}
