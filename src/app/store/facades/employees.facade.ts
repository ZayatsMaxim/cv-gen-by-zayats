import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectEmployee,
  selectEmployeeById,
  selectEmployeeId,
  selectEmployeesList,
} from '../selectors/employee.selectors';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
} from '../actions/employee.actions';
import { EmployeeDTO } from '../../shared/models/dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesFacade {
  constructor(private store: Store) {}

  selectEmployee$(): Observable<Employee> {
    return this.store.select(selectEmployee);
  }

  selectEmployeeId$(): Observable<number> {
    return this.store.select(selectEmployeeId);
  }

  selectEmployeeById$(id: number): Observable<Employee> {
    return this.store.select(selectEmployeeById(id));
  }

  selectEmployeesList$(): Observable<Employee[]> {
    return this.store.select(selectEmployeesList);
  }

  getAllEmployees() {
    this.store.dispatch(getAllEmployees());
  }

  getEmployeeById(id: number) {
    this.store.dispatch(getEmployeeById({ id }));
  }

  createEmployee(employee: EmployeeDTO) {
    this.store.dispatch(createEmployee({ employee: employee }));
  }

  deleteEmployeeById(id: number) {
    this.store.dispatch(deleteEmployeeById({ id: id }));
  }

  updateEmployeeById(id: number, employee: EmployeeDTO) {
    this.store.dispatch(updateEmployeeById({ id: id, employee: employee }));
  }
}
