import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { Gradient } from 'src/app/types/Gradient';
import { environment } from 'src/environments/environment';
import { Utilities } from '../../helpers';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) {}
  gradients: Gradient[] = [];
  loggedInUserRole: string = '';
  scrollToGradeints(cssSelector: string): void {
    Utilities.scrollToElement(cssSelector);
  }

  ngOnInit(): void {
    this.http.get<ApiResponse>(`${environment.apiUrl}/gradient/all`).subscribe({
      next: (resp: ApiResponse) => {
        this.gradients = resp.data;
      },
      error: (error: HttpErrorResponse) => {
        !environment.production ? console.error(error) : null;
      },
    });

    if (this.auth.loggedIn()) {
      this.auth.loggedInUser().subscribe({
        next: (resp: ApiResponse) => {
          this.loggedInUserRole = resp.data.role;
        },
        error: (error) => {
          Utilities.devLog(error);
        },
      });
    }

    // TODO Create check for logged in user then return that users role.
  }
}
