import { createAction, props } from '@ngrx/store';
import { EmployeeDTO } from '../../shared/models/dto.model';
import { Employee } from '../../shared/models/employee.model';

export const getAllEmployees = createAction(
  '[Employees List Page] Get All Employees',
);

export const getAllEmployeesSuccess = createAction(
  '[Employee Effects] Get All Employees Success',
  props<{ employees: Employee[] }>(),
);

export const getEmployeeById = createAction(
  '[Employee Details Page] Get Employee',
  props<{ id: number }>(),
);

export const getEmployeeSuccess = createAction(
  '[Employee Effects] Get Employee Success',
  props<{ employee: Employee }>(),
);

export const createEmployee = createAction(
  '[Employee Create Page] Create Employee',
  props<{ employee: EmployeeDTO }>(),
);

export const createEmployeeSuccess = createAction(
  '[Employee Effects] Create Employee Success',
  props<{ employee: Employee }>(),
);

export const updateEmployeeById = createAction(
  '[Employee Edit Page] Update Employee',
  props<{ id: number; employee: EmployeeDTO }>(),
);

export const updateEmployeeSuccess = createAction(
  '[Employee Effects] Update Employee Success',
  props<{ employee: Employee }>(),
);

export const deleteEmployeeById = createAction(
  '[Employee Edit Page] Delete Employee by Id',
  props<{ id: number }>(),
);

export const deleteEmployeeByIdSuccess = createAction(
  '[Employee Effects] Delete Employee Success',
  props<{ id: number }>(),
);
