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
    'EMPLOYEES_TABLE_HEADER_FIRST_NAME',
    'EMPLOYEES_TABLE_HEADER_LAST_NAME',
    'EMPLOYEES_TABLE_HEADER_EMAIL',
    'EMPLOYEES_TABLE_HEADER_DEPARTMENT',
    'EMPLOYEES_TABLE_HEADER_SPECIALIZATION',
  ];
  tableBody: EmployeeTableData[];
  routerLinks: string[];

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.employeeList$ = this.store.select(selectEmployeesList);
    this.store.dispatch(getAllEmployees());
  }

  ngOnInit(): void {
    this.employeeList$.subscribe((employees: Employee[]) => {
      if (employees) {
        this.tableBody = this.mapEmployeesToTableData(employees);
        this.routerLinks = this.mapRouterLinks(employees);
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

  private mapRouterLinks(employees: Employee[]): string[] {
    return employees.map(employee => `/home/employees/edit/${employee.id}`);
  }
}
