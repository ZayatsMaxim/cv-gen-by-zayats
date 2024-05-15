import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';
import * as CvActions from '../actions/cv.actions';

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
  on(
    CvActions.createNewCv,
    (state, { cv }): Employee => ({
      ...state,
      cvs: [...state.cvs, cv],
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
