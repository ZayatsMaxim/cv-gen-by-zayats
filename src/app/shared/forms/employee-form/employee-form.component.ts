import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { Employee } from '../../models/employee.model';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeDTO } from '../../models/dto.model';
import {
  createEmployee,
  updateEmployeeById,
} from '../../../store/actions/employee.actions';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { selectEmployeeId } from '../../../store/selectors/employee.selectors';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DropdownListComponent,
    TranslateModule,
    MatButtonModule,
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
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  employeeForm: FormGroup;

  specializations?: string[];
  departments?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
    this.employeeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      email: [this.employee.email, Validators.required],
      specialization: [this.employee.specialization.name, Validators.required],
      department: [this.employee.department.name, Validators.required],
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

  ngOnChanges(): void {
    if (!this.employee) return;
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      specialization: this.employee.specialization.name,
      department: this.employee.department.name,
    });
  }

  saveEmployee() {
    if (!this.employeeForm.valid) return;
    const employeeDto: EmployeeDTO = {
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      department: this.employeeForm.value.department,
      specialization: this.employeeForm.value.specialization,
    };

    if (this.employee.id === -1) {
      this.store.dispatch(createEmployee({ employee: employeeDto }));
    } else {
      this.store.dispatch(
        updateEmployeeById({ id: this.employee.id, employee: employeeDto }),
      );
    }
  }
}
