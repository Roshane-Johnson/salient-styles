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
  isAdmin: boolean = false;
  isLoading: boolean = true;

  constructor(private router: Router, private _auth: AuthService) {
    this._auth.loggedInUser().subscribe({
      next: (resp: ApiResponse) => {
        if (resp.data.role == UserType.USER) {
          this.isLoading = false;
          this.isAdmin = true;
        } else {
          // Navigate to not found if not authenticated
          router.navigate(['/not-found']);
        }
      },
    });
  }

  ngOnInit(): void {}
}
