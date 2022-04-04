import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiResponse } from 'src/app/types/ApiResponse';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  constructor(private userInfoService: UserInfoService) {
    this.userInfoService.getAuthUserInfo().subscribe({
      next: (resp: ApiResponse) => (this.currentUser = resp.data),
      error: (err: any) => console.log(err),
    });
  }

  currentUser: any = '';

  ngOnInit(): void {}
}
