import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  standalone: true,
})
export class BasicInputDirective implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() errorMessage?: string;

  value: any;
  disabled = false;
  hasError = false;

  constructor() {}

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
}
