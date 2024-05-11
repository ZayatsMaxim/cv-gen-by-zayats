import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteCvDialogComponent } from './delete-cv-dialog/delete-cv-dialog.component';

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
export class CvListComponent implements OnInit {
  @Input() options: string[];
  cv: string;
  @Output() selectedCv = new EventEmitter<string>();
  @Output() deletedCv = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectCv(this.options[0]);
  }

  selectCv(option: string) {
    this.cv = option;
    this.selectedCv.emit(option);
  }

  deleteCv(option: string) {
    const dialogRef = this.dialog.open(DeleteCvDialogComponent, {
      data: { cvName: option },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.deletedCv.emit(option);
      this.selectCv(this.options[0]);
    });
  }
}
