import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent, ReactiveFormsModule],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
})
export class EmployeeInfoComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
}
