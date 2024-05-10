import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';

export const selectEmployeeState = createFeatureSelector<Employee>('employee');

export const selectEmployee = createSelector(
  selectEmployeeState,
  (state: Employee) => state,
);
