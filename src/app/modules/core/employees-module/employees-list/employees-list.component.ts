import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BaseListComponent } from '../../../../shared/base-list/base-list.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../../../shared/models/employee.model';
import { selectEmployeesList } from '../../../../store/selectors/employee.selectors';
import { getAllEmployees } from '../../../../store/actions/employee.actions';

export interface EmployeeTableData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
}

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, BaseListComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent implements OnInit {
  employeeList$: Observable<Employee[]>;

  headers = [
    'EMPLOYEE_TABLE_HEADER_FIRST_NAME',
    'EMPLOYEE_TABLE_HEADER_LAST_NAME',
    'EMPLOYEE_TABLE_HEADER_EMAIL',
    'EMPLOYEE_TABLE_HEADER_DEPARTMENT',
    'EMPLOYEE_TABLE_HEADER_SPECIALIZATION',
  ];
  tableBody: EmployeeTableData[];

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.employeeList$ = this.store.select(selectEmployeesList);
    this.store.dispatch(getAllEmployees());
  }

  ngOnInit(): void {
    this.employeeList$ = this.store.select(selectEmployeesList);
    this.store.dispatch(getAllEmployees());

    this.employeeList$.subscribe((employees: Employee[]) => {
      if (employees) {
        this.tableBody = this.mapEmployeesToTableData(employees);
        this.cdr.detectChanges();
      }
    });
  }

  private mapEmployeesToTableData(employees: Employee[]): EmployeeTableData[] {
    return employees.map(employee => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department.name,
      specialization: employee.specialization.name,
    }));
  }
}

// ngOnInit(): void {
//   this.employeeList$.subscribe(list => {
//     this.tableBody = list.map(employee => ({
//       firstName: employee.firstName,
//       lastName: employee.lastName,
//       email: employee.email,
//       department: employee.department.name,
//       specialization: employee.specialization.name,
//     }));
//   });
// }
