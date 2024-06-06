import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../../../shared/models/employee.model';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss',
})
export class EmployeeCreateComponent {
  employee: Employee;

  constructor() {
    this.employee = {
      id: -1,
      firstName: '',
      lastName: '',
      email: '',
      department: {
        id: -1,
        name: '',
      },
      departmentId: -1,
      specialization: {
        id: -1,
        name: '',
      },
      specializationId: -1,
      cvs: [],
    };
  }
}
