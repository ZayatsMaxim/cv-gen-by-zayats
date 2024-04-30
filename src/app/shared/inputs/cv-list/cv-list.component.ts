import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cv-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
})
export class CvListComponent implements OnInit {
  @Input() options: string[];
  cv: string;
  @Output() selectedCv = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectCv(this.options[0]);
  }

  selectCv(option: string) {
    this.cv = option;
    this.selectedCv.emit(option);
  }
}
