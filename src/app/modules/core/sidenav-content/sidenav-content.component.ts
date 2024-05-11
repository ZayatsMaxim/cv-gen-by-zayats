import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.scss',
})
export class SidenavContentComponent {}
