import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, BreadcrumbsComponent],
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
        switch (currentUrl) {
          case '/home/employees/list':
            console.log('home!');
            this.pageHeader = 'Employees';
            this.pageTitle = 'Employees list';
            break;
          default:
            console.log(currentUrl);
            break;
        }
      }
    });
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
