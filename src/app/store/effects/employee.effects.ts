import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '../../shared/services/employees.service';
import * as EmployeeActions from '../actions/employee.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(
    private $actions: Actions,
    private employeeService: EmployeesService,
  ) {}

  getEmployeeById = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.getEmployeeById),
      exhaustMap(({ id }) =>
        this.employeeService.getEmployeeById(id).pipe(
          map(fetchedEmployee =>
            EmployeeActions.getEmployeeSuccess({
              employee: fetchedEmployee,
            }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  getAllEmployees = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.getAllEmployees),
      exhaustMap(() =>
        this.employeeService.getEmployees().pipe(
          map(fetchedEmployees =>
            EmployeeActions.getAllEmployeesSuccess({
              employees: fetchedEmployees,
            }),
          ),
        ),
      ),
    );
  });

  updateEmployee = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.updateEmployeeById),
      exhaustMap(({ id, employee }) =>
        this.employeeService.updateEmployeeById(id, employee).pipe(
          map(updatedEmployee =>
            EmployeeActions.updateEmployeeSuccess({
              employee: updatedEmployee,
            }),
          ),
        ),
      ),
    );
  });
}
