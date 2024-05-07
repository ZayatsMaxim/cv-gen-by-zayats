import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';

export const employeeInitialtate: Employee = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  department: null,
  departmentId: null,
  specialization: null,
  specializationId: null,
  cvs: null,
};

export const employeeReducer = createReducer(
  employeeInitialtate,
  on(
    EmployeeActions.getEmployeeByIdSuccess,
    (employee): Employee => ({
      ...employee,
    }),
  ),
);
