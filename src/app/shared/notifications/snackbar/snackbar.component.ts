import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-update-success-snackbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './snackbar.component.html',
  styles: '',
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
