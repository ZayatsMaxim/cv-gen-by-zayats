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
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
  imports: [CommonModule, BaseListComponent, MatButtonModule, TranslateModule],
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
  routerLinks: string[];

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.employeeList$ = this.store.select(selectEmployeesList);
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

  navigateToCreateEmployee() {
    this.router.navigate(['/home/employees/create']);
  }
}
