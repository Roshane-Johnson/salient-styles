import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { UserType } from 'src/app/enums/user-type';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false;
  isLoading: boolean = true;

  constructor(private _activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin =
      this._activatedRoute.snapshot.data['resp'].data.role == UserType.ADMIN;

    if (this.isAdmin) {
      this.router.navigate(['admin/dashboard']);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
