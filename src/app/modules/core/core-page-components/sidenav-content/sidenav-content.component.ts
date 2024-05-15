import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    RouterLinkActive,
    TranslateModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.scss',
})
export class SidenavContentComponent {
  @Output() toggleSidenavEvent: EventEmitter<void> = new EventEmitter<void>();

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
