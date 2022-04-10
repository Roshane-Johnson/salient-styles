import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  /** Determins if the navbar should be shown on seleted pages */
  showNavbar: boolean = false;

  /** Ensure that the disallowed routes doesn't have a starting slash "/" */
  disallowNavbarRoutes: string[] = ['login', 'signup', 'not-found'];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Eventlistener for route changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        for (let route of this.disallowNavbarRoutes) {
          if (event.url == `/${route}`) {
            this.showNavbar = false;
            // if the route and item of array is a match then break
            break;
          } else {
            this.showNavbar = true;
          }
        }
      }
    });
  }
}
