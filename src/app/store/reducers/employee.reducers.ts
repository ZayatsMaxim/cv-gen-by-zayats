import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';

export const employeeInitialState: Employee = null;
export const employeesListInitialState: Employee[] = null;

export const employeeReducer = createReducer(
  employeeInitialState,
  on(
    EmployeeActions.getEmployeeByIdSuccess,
    (state, { employee }): Employee => ({
      ...state,
      ...employee,
    }),
  ),
);

export const employeesListReducer = createReducer(
  employeesListInitialState,
  on(
    EmployeeActions.getAllEmployeesSuccess,
    (state, { employees }): Employee[] => [...employees],
  ),
);
