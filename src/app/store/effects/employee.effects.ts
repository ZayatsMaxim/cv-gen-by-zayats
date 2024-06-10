import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '../../shared/services/employees.service';
import * as EmployeeActions from '../actions/employee.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/notifications/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
  constructor(
    private $actions: Actions,
    private employeeService: EmployeesService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  getEmployeeById$ = createEffect(() => {
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

  getAllEmployees$ = createEffect(() => {
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

  updateEmployee$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.updateEmployeeById),
      exhaustMap(({ id, employee }) =>
        this.employeeService.updateEmployeeById(id, employee).pipe(
          map(updatedEmployee => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'EMPLOYEE_INFO_SAVE_SUCCESS',
            });
            return EmployeeActions.updateEmployeeSuccess({
              employee: updatedEmployee,
            });
          }),
        ),
      ),
    );
  });

  createEmployee$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.createEmployee),
      exhaustMap(({ employee }) =>
        this.employeeService.createEmployee(employee).pipe(
          map(createdEmployee => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'EMPLOYEE_INFO_CREATE_SUCCESS',
            });
            this.router.navigate([
              `/home/employees/edit/${createdEmployee.id}`,
            ]);
            return EmployeeActions.createEmployeeSuccess({
              employee: createdEmployee,
            });
          }),
        ),
      ),
    );
  });

  deleteEmployee$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(EmployeeActions.deleteEmployeeById),
      exhaustMap(({ id }) =>
        this.employeeService.deleteEmployee(id).pipe(
          map(deletedEmployee => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'EMPLOYEE_DELETE_SUCCESS_SNACKBAR',
            });
            this.router.navigate([`/home/employees/list`]);
            return EmployeeActions.deleteEmployeeByIdSuccess({
              id: deletedEmployee.id,
            });
          }),
        ),
      ),
    );
  });
}
