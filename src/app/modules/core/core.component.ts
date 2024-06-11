import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopToolbarComponent } from './core-page-components/top-toolbar/top-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavContentComponent } from './core-page-components/sidenav-content/sidenav-content.component';
import { PageHeaderComponent } from './core-page-components/page-header/page-header.component';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService) {
    this.translate.use(
      localStorage.getItem('lang') || this.translate.defaultLang,
    );
  }
}
