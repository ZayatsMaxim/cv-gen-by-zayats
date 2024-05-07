import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesDataService } from '../../shared/services/employees-data.service';
import * as EmployeeActions from '../actions/employee.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(
    private $actions: Actions,
    private employeeService: EmployeesDataService,
  ) {}

  getEmployeeById = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.getEmployeeById),
      exhaustMap(({ id }) =>
        this.employeeService.getEmployeeById(id).pipe(
          map(fetchedEmployee =>
            EmployeeActions.getEmployeeByIdSuccess({
              employee: fetchedEmployee,
            }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
