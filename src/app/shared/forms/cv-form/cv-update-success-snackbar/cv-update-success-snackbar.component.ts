import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-update-success-snackbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './cv-update-success-snackbar.component.html',
  styles: '',
})
export class CvUpdateSuccessSnackbarComponent {}
