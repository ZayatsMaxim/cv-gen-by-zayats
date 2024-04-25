import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BasicInputDirective } from '../basic-input.directive';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
})
export class CvListComponent extends BasicInputDirective {
  @Input() options: string[];

  selectCv(option: string) {
    this.writeValue(option);
  }
}
