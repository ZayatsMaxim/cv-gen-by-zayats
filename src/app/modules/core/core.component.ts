import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopToolbarComponent } from './core-page-components/top-toolbar/top-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavContentComponent } from './core-page-components/sidenav-content/sidenav-content.component';
import { PageHeaderComponent } from './core-page-components/page-header/page-header.component';
import { Store } from '@ngrx/store';
import { getAllProjects } from '../../store/actions/projects.actions';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopToolbarComponent,
    MatSidenavModule,
    SidenavContentComponent,
    PageHeaderComponent,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {
  sidenavOpened: boolean = true;

  constructor(private store: Store) {
    this.store.dispatch(getAllProjects());
  }
}
