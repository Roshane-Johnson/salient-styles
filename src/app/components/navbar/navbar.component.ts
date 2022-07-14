import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(private authService: AuthService) {}

	currentUser: any = '';

	loggedIn: boolean = this.authService.loggedIn();

	logoutUser() {
		this.authService.logoutUser().subscribe((resp: ApiResponse) => {
			if (resp.message.toLowerCase().includes('logged out')) {
				localStorage.removeItem('token');
				location.reload();
			}
		});
	}

	ngOnInit(): void {
		if (this.authService.loggedIn()) {
			this.authService.loggedInUser().subscribe((resp: ApiResponse) => (this.currentUser = resp.data));
		}
	}
}
