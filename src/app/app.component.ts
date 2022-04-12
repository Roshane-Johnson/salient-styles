import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

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
  disallowNavbarRoutes: string[] = [
    'login',
    'signup',
    'not-found',
    'admin',
    'admin/dashboard',
    'admin/dashboard/create',
    'admin/dashboard/edit',
  ];

  /** Determins if the navbar should be shown on seleted pages */
  showFooter: boolean = false;

  /** Ensure that the disallowed routes doesn't have a starting slash "/" */
  disallowFooterRoutes: string[] = [
    'login',
    'signup',
    'not-found',
    'admin',
    'admin/dashboard',
    'admin/dashboard/create',
    'admin/dashboard/edit',
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let topLevelRoutes: any = this.router.config
      .map((route: Route) => {
        if (route.path?.includes('admin')) return route.path;
        return null;
      })
      .filter(Boolean);

    this.disallowFooterRoutes = [
      ...this.disallowFooterRoutes,
      ...topLevelRoutes,
    ];

    this.disallowNavbarRoutes = [
      ...this.disallowFooterRoutes,
      ...topLevelRoutes,
    ];

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
        for (let route of this.disallowFooterRoutes) {
          if (event.url == `/${route}`) {
            this.showFooter = false;
            // if the route and item of array is a match then break
            break;
          } else {
            this.showFooter = true;
          }
        }
      }
    });
  }
}
