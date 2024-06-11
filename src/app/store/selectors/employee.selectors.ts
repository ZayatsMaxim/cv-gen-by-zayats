import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';

export const selectEmployeeState = createFeatureSelector<Employee>('employee');
export const selectEmployeesListState =
  createFeatureSelector<Employee[]>('employeesList');

export const selectEmployee = createSelector(
  selectEmployeeState,
  (state: Employee) => state,
);

export const selectEmployeeById = (id: number) =>
  createSelector(selectEmployeesListState, (state: Employee[]) => {
    return state.find(employee => employee.id === id);
  });

export const selectEmployeeId = createSelector(
  selectEmployeeState,
  (state: Employee) => state.id,
);

export const selectEmployeesList = createSelector(
  selectEmployeesListState,
  (state: Employee[]) => state,
);
