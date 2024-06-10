import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EmployeeCvComponent } from '../employee-cv/employee-cv.component';
import { Employee } from '../../../../shared/models/employee.model';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';
import { MatButtonModule } from '@angular/material/button';
import { DropdownListComponent } from '../../../../shared/inputs/dropdown-list/dropdown-list.component';
import { TextInputComponent } from '../../../../shared/inputs/text-input/text-input.component';
import { EmployeeDTO } from '../../../../shared/models/dto.model';
import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from '../../../../store/actions/employee.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/notifications/dialog/dialog.component';

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
    TextInputComponent,
    DropdownListComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() employee: Employee;
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialog: MatDialog,
  ) {
    this.employeeForm = this.formBuilder.group({
      employee: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        specialization: ['', Validators.required],
        department: ['', Validators.required],
      }),
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
    if (!this.employeeForm.valid) return;
    const employeeDto: EmployeeDTO = {
      firstName: this.employeeForm.get(['employee']).get(['firstName']).value,
      lastName: this.employeeForm.get(['employee']).get(['lastName']).value,
      email: this.employeeForm.get(['employee']).get(['email']).value,
      department: this.employeeForm.get(['employee']).get(['department']).value,
      specialization: this.employeeForm
        .get(['employee'])
        .get(['specialization']).value,
    };

    if (this.employee.id === -1) {
      this.store.dispatch(createEmployee({ employee: employeeDto }));
    } else {
      this.store.dispatch(
        updateEmployeeById({ id: this.employee.id, employee: employeeDto }),
      );
    }
  }

  deleteEmployee() {
    if (this.employee.id === -1) return;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        objectName: `${this.employee.firstName} ${this.employee.lastName}`,
        title: 'EMPLOYEE_DELETE_TITLE',
        question: 'EMPLOYEE_DELETE_QUESTION',
        notification: 'EMPLOYEE_DELETE_NOTIFICATION',
        dismissButton: 'EMPLOYEE_DELETE_CANCEL',
        confirmButton: 'EMPLOYEE_DELETE_CONFIRM',
        warn: true,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.store.dispatch(deleteEmployeeById({ id: this.employee.id }));
    });
  }
}
