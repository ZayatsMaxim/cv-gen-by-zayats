import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { BasicInputDirective } from '../basic-input.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  extends BasicInputDirective
  implements OnInit, DoCheck
{
  valueControl = new FormControl('');

  constructor(
    public ngControl: NgControl,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  ngDoCheck(): void {
    console.log('helloworld');

    if (this.ngControl.control?.errors !== this.valueControl.errors) {
      this.valueControl.setErrors(this.ngControl.control?.errors);
    }

    if (this.ngControl.control?.touched) {
      this.valueControl.markAsTouched();
      this.cdr.markForCheck();
    } else {
      this.valueControl.markAsPristine();
    }
  }

  ngOnInit(): void {
    this.valueControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }
}
