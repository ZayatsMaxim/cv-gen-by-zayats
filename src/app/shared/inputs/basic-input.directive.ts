import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Directive({
  standalone: true,
})
export class BasicInputDirective
  implements ControlValueAccessor, OnInit, DoCheck
{
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() apperance?: MatFormFieldAppearance;

  disabled = false;
  hasError = false;
  valueControl = new FormControl('');

  constructor(
    public ngControl: NgControl,
    public cdr: ChangeDetectorRef,
  ) {
    ngControl.valueAccessor = this;
  }

  onChange!: (value: any) => void;
  onTouched!: () => void;

  writeValue(value: any): void {
    this.valueControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngDoCheck(): void {
    if (this.ngControl.control?.errors !== this.valueControl.errors) {
      this.valueControl.setErrors(this.ngControl.control?.errors);
    }
    if (this.ngControl.control?.touched) {
      this.valueControl.markAsTouched();
      this.cdr.markForCheck();
    } else {
      this.valueControl.markAsPristine();
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {
    this.valueControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }
}
