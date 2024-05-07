import { createAction, props } from '@ngrx/store';
import { EmployeeDTO } from '../../shared/models/dto.model';
import { Employee } from '../../shared/models/employee.model';

export const getAllEmployees = createAction(
  '[Employees List Page] Get All Employees',
);

export const getAllEmployeesSuccess = createAction(
  '[Employee Effect] Get All Employees Success',
  props<{ employees: Employee[] }>(),
);

export const getEmployeeById = createAction(
  '[Employee Details Page] Get Employee',
  props<{ id: number }>(),
);

export const getEmployeeByIdSuccess = createAction(
  '[Employee Effect] Get Employee Success',
  props<{ employee: Employee }>(),
);

export const createEmployee = createAction(
  '[Employee Create Page] Create Employee',
  props<{ employee: EmployeeDTO }>(),
);

export const updateEmployeeById = createAction(
  '[Employee Edit Page] Update Employee',
  props<{ id: number; employee: EmployeeDTO }>(),
);
