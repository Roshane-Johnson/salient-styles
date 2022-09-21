import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { AuthService } from 'src/app/services/auth.service';
import { ApiResponse } from 'src/app/types/ApiResponse';

@Component({
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
	// TODO Remove boolean negations to enable this check
	isAdmin: boolean = !false;
	isLoading: boolean = !true;
	authUser: any;

	constructor(private router: Router, private auth: AuthService) {
		// this.auth.loggedInUser().subscribe({
		// 	next: (resp: ApiResponse) => {
		// 		if (resp.data.role == UserType.ADMIN) {
		// 			this.isLoading = false;
		// 			this.isAdmin = true;
		// 			this.authUser = resp.data;
		// 		} else {
		// 			// Navigate to not found if not authenticated
		// 			router.navigate(['/not-found']);
		// 		}
		// 	},
		// });
	}

	ngOnInit(): void {}
}
