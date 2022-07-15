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
	constructor(private http: HttpClient, private authService: AuthService, private utilService: SharedUtilsService) {}

	gradients: Gradient[] = [];
	loggedInUserRole: string = '';

	scrollToGradeints(cssSelector: string): void {
		this.utilService.scrollToElement(cssSelector);
	}

	ngOnInit(): void {
		this.http.get<ApiResponse>(`${environment.apiUrl}/gradient/all`).subscribe({
			next: (resp: ApiResponse) => {
				this.gradients = resp.data;
			},
			error: (error: HttpErrorResponse) => {
				this.utilService.devlog(error.error);
			},
		});

		if (this.authService.loggedIn()) {
			this.authService.loggedInUser().subscribe({
				next: (resp: ApiResponse) => {
					this.loggedInUserRole = resp.data.role;
				},
				error: (error) => {
					this.utilService.devlog(error);
				},
			});
		}
	}
}
