import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
export class TopToolbarComponent {
  constructor(private translateService: TranslateService) {}

  changeLanguage() {
    const langs = this.translateService.langs;
    const currentLang = this.translateService.currentLang;
    const currentLangIndex = langs.indexOf(currentLang);
    const nextLangIndex =
      currentLangIndex >= 0 && currentLangIndex < langs.length - 1
        ? currentLangIndex + 1
        : 0;
    const langToUse = langs[nextLangIndex];
    localStorage.setItem('lang', langToUse);
    this.translateService.use(localStorage.getItem('lang'));
  }
}
