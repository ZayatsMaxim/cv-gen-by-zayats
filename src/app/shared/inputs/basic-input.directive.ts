import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive({
  standalone: true,
})
export class BasicInputDirective
  implements ControlValueAccessor, OnInit, DoCheck
{
  @Input() placeholder?: string;
  @Input() label?: string;

  value: any;
  disabled = false;
  hasError = false;
  valueControl = new FormControl('');

  constructor(
    public ngControl: NgControl,
    private cdr: ChangeDetectorRef,
  ) {
    ngControl.valueAccessor = this;
  }

  onChange!: (value: any) => void;
  onTouched!: () => void;

  writeValue(value: any): void {
    this.value = value;
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

  validateRequired() {
    return this.value == false;
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
