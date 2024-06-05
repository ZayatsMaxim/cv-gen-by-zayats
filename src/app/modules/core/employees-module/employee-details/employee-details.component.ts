import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EmployeeCvComponent } from '../employee-cv/employee-cv.component';
import { Employee } from '../../../../shared/models/employee.model';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { updateEmployeeById } from '../../../../store/actions/employee.actions';
import { EmployeeDTO } from '../../../../shared/models/dto.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeCvComponent,
    EmployeeFormComponent,
    MatTabsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.employeeForm = this.formBuilder.group({
      employee: this.formBuilder.control({}),
    });
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employee: {
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        specialization: this.employee.specialization.name,
        department: this.employee.department.name,
      },
    });
  }

  ngOnChanges(): void {
    if (!this.employee) return;
    this.employeeForm.patchValue({
      employee: {
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        specialization: this.employee.specialization.name,
        department: this.employee.department.name,
      },
    });
  }

  saveEmployee() {
    const employeeDto: EmployeeDTO = {
      firstName: this.employeeForm.value.employee.firstName,
      lastName: this.employeeForm.value.employee.lastName,
      email: this.employeeForm.value.employee.email,
      department: this.employeeForm.value.employee.department,
      specialization: this.employeeForm.value.employee.specialization,
    };
    this.store.dispatch(
      updateEmployeeById({ id: this.employee.id, employee: employeeDto }),
    );
  }
}
