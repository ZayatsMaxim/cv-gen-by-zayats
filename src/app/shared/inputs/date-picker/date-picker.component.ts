import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorMessagePipe } from '../../pipes/error-message.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicInputDirective } from '../basic-input.directive';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ErrorMessagePipe,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class DatePickerComponent extends BasicInputDirective {}