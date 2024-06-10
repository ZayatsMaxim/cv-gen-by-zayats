import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../notifications/dialog/dialog.component';

@Component({
  selector: 'cv-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
})
export class CvListComponent implements OnInit, OnChanges {
  @Input() options: string[];
  cv: string;
  @Output() selectedCv = new EventEmitter<string>();
  @Output() deletedCv = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectCv(this.options[0]);
  }

  ngOnChanges(): void {
    this.selectCv(this.options[0]);
  }

  selectCv(option: string) {
    this.cv = option;
    this.selectedCv.emit(option);
  }

  deleteCv(option: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        objectName: option,
        title: 'CV_DELETE_TITLE',
        question: 'CV_DELETE_QUESTION',
        notification: 'CV_DELETE_NOTIFICATION',
        dismissButton: 'CV_DELETE_CANCEL',
        confirmButton: 'CV_DELETE_CONFIRM',
        warn: true,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.deletedCv.emit(option);
      this.selectCv(this.options[0]);
    });
  }
}
