import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private userInfoService: UserInfoService
  ) {}

  currentUser: any = '';

  isLoggedIn: boolean = this._auth.loggedIn();

  logoutUser() {
    this._auth.logoutUser().subscribe((resp: ApiResponse) => {
      console.assert(environment.production, resp);
      if (resp.message.toLowerCase().includes('logged out')) {
        localStorage.removeItem('token');
        location.reload();
      }
    });
  }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this.userInfoService
        .getAuthUserInfo()
        .subscribe((resp: ApiResponse) => (this.currentUser = resp.data));
    }
  }
}
