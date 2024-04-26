import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DropdownListComponent,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: [
    './employee-form.component.scss',
    '../../styles/inputs.scss',
    '../../styles/form.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeFormComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements ControlValueAccessor, OnInit {
  employeeForm!: FormGroup;

  specializations?: string[];
  departments?: string[];

  onTouched = () => {};
  onChange = (value: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.sharedService.getDepartments().subscribe(options => {
      this.departments = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
      this.cdr.detectChanges();
    });
  }

  writeValue(obj: { [key: string]: unknown }): void {
    this.employeeForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.employeeForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
