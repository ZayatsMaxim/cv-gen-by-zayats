import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../shared/services/cv.service';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CvActions from '../actions/cv.actions';
import { SnackbarComponent } from '../../shared/notifications/snackbar/snackbar.component';

@Injectable()
export class CvEffects {
  constructor(
    private $actions: Actions,
    private cvService: CvService,
    private snackBar: MatSnackBar,
  ) {}

  getCvById$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.getCvById),
      exhaustMap(({ id }) =>
        this.cvService.getCvById(id).pipe(
          map(CV => CvActions.getCvByIdSuccess({ cv: CV })),
          catchError(error => {
            this.snackBar.open(error.message, '', { duration: 5000 });
            return EMPTY;
          }),
        ),
      ),
    );
  });

  saveNewCv$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.saveNewCv),
      exhaustMap(({ cv }) =>
        this.cvService.createCv(cv).pipe(
          map(CV => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'CV_CREATE_SUCCESS_SNACKBAR',
            });
            return CvActions.saveNewCvSuccess({ cv: CV });
          }),
          catchError(error => {
            this.snackBar.open(error.message, '', { duration: 5000 });
            return EMPTY;
          }),
        ),
      ),
    );
  });

  updateCv$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.updateCvById),
      exhaustMap(({ id, cv }) =>
        this.cvService.updateCvById(id, cv).pipe(
          map(CV => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'CV_UPDATE_SUCCESS_SNACKBAR',
            });
            return CvActions.updateCvSuccess({ cv: CV });
          }),
          catchError(error => {
            this.snackBar.open(error.message, '', { duration: 5000 });
            return EMPTY;
          }),
        ),
      ),
    );
  });

  deleteCv$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.deleteCvById),
      exhaustMap(({ id }) =>
        this.cvService.deleteCvById(id).pipe(
          map(CV => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'CV_DELETE_SUCCESS_SNACKBAR',
            });
            return CvActions.deleteCvSuccess({ cv: CV });
          }),
          catchError(error => {
            this.snackBar.open(error.message, '', { duration: 5000 });
            return EMPTY;
          }),
        ),
      ),
    );
  });
}
