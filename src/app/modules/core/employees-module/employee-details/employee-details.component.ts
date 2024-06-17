import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { DropdownListComponent } from '../../../../shared/inputs/dropdown-list/dropdown-list.component';
import { TextInputComponent } from '../../../../shared/inputs/text-input/text-input.component';
import { EmployeeDTO } from '../../../../shared/models/dto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/notifications/dialog/dialog.component';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';
import { EmployeesFacade } from '../../../../store/facades/employees.facade';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() employee: Employee;
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private employeesFacade: EmployeesFacade,
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

    this.employeeForm.get(['employee']).patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      specialization: this.employee.specialization.name,
      department: this.employee.department.name,
    });
  }

  saveEmployee() {
    if (!this.employeeForm.valid) {
      this.employeeForm.get(['employee']).markAllAsTouched();
      return;
    }

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
      this.employeesFacade.createEmployee(employeeDto);
    } else {
      this.employeesFacade.updateEmployeeById(this.employee.id, employeeDto);
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
      this.employeesFacade.deleteEmployeeById(this.employee.id);
    });
  }
}
