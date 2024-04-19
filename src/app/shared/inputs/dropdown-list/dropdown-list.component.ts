import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicInputDirective } from '../basic-input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessagePipe } from '../../pipes/error-message.pipe';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'dropdown-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ErrorMessagePipe,
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownListComponent extends BasicInputDirective {
  @Input() options: string[];
}
