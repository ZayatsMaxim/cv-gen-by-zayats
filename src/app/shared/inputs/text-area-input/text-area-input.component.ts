import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicInputDirective } from '../basic-input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessagePipe } from '../../pipes/error-message.pipe';

@Component({
  selector: 'text-area-input',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
  ],
  templateUrl: './text-area-input.component.html',
  styleUrl: './text-area-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaInputComponent extends BasicInputDirective {}
