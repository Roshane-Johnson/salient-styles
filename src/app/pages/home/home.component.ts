import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { Gradient } from 'src/app/types/Gradient';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _util: SharedUtilsService
  ) {}
  gradients: Gradient[] = [];
  loggedInUserRole: string = '';
  scrollToGradeints(cssSelector: string): void {
    this._util.scrollToElement(cssSelector);
  }

  ngOnInit(): void {
    this.http.get<ApiResponse>(`${environment.apiUrl}/gradient/all`).subscribe({
      next: (resp: ApiResponse) => {
        this.gradients = resp.data;
      },
      error: (error: HttpErrorResponse) => {
        this._util.devlog(error.error);
      },
    });

    if (this._auth.loggedIn()) {
      this._auth.loggedInUser().subscribe({
        next: (resp: ApiResponse) => {
          this.loggedInUserRole = resp.data.role;
        },
        error: (error) => {
          this._util.devlog(error);
        },
      });
    }
  }
}
