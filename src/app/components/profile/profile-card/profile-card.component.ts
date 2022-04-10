import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  currentUser?: User;
  username: string | null = '';
  gradientCount: number | undefined = 0;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.auth.loggedInUser().subscribe({
      next: (resp: ApiResponse) => {
        this.currentUser = resp.data;
        this.gradientCount = this.currentUser?.gradients.length;
      },
      error: (err: any) => console.log(err),
    });
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
  }
}
