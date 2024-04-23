import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';

@Component({
  selector: 'app-employee-form',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements ControlValueAccessor, OnInit {
  employeeForm!: FormGroup;

  specializations?: string[];
  departments?: string[];

  public onTouched: () => void = () => {};

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
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
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
    });
  }

  writeValue(obj: { [key: string]: unknown }): void {
    obj && this.employeeForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.employeeForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log(fn);
    this.onTouched = fn;
  }
}
