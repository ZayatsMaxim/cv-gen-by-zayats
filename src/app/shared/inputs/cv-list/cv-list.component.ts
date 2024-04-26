import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BasicInputDirective } from '../basic-input.directive';

@Component({
  selector: 'cv-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
})
export class CvListComponent {
  @Input() options: string[];
  @Output() selectedCv: string;

  selectCv(option: string) {
    this.selectedCv = option;
  }
}
