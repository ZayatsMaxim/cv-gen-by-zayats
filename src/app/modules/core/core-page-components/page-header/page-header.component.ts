import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BreadcrumbsComponent,
    TranslateModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Output() toggleSidenavEvent: EventEmitter<void> = new EventEmitter<void>();

  pageHeader: string = 'default';
  pageTitle: string = 'default';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        switch (true) {
          case /^\/home\/employees\/list$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_EMPLOYEES';
            this.pageTitle = 'PAGE_HEADER_EMPLOYEES_LIST';
            break;
          case /^\/home\/employees\/edit\/\d+$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_EMPLOYEES';
            this.pageTitle = 'PAGE_HEADER_EMPLOYEE_PROFILE';
            break;
          case /^\/home\/employees\/create$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_EMPLOYEES';
            this.pageTitle = 'PAGE_HEADER_NEW_EMPLOYEE';
            break;
          case /^\/home\/projects\/list$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_PROJECTS';
            this.pageTitle = 'PAGE_HEADER_PROJECTS_LIST';
            break;
          case /^\/home\/projects\/edit\/\d+$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_PROJECTS';
            this.pageTitle = 'PAGE_HEADER_PROJECT_INFO';
            break;
          case /^\/home\/projects\/create$/.test(currentUrl):
            this.pageHeader = 'PAGE_HEADER_PROJECTS';
            this.pageTitle = 'PAGE_HEADER_NEW_PROJECT';
            break;
          default:
            this.pageHeader = 'PAGE_HEADER_HOME_PAGE';
            this.pageTitle = 'PAGE_HEADER_HOME_PAGE';
            break;
        }
      }
    });
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
