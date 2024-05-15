import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    TranslateModule,
    MatBadgeModule,
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss',
})
export class TopToolbarComponent {}
