import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopToolbarComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidenavContentComponent,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {
  sidenavOpened: boolean = true;
}
