import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../shared/services/cv.service';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CvActions from '../actions/cv.actions';
import { CvUpdateSuccessSnackbarComponent } from '../../shared/forms/cv-form/cv-update-success-snackbar/cv-update-success-snackbar.component';

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
            this.snackBar.openFromComponent(CvUpdateSuccessSnackbarComponent, {
              duration: 3000,
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
            this.snackBar.openFromComponent(CvUpdateSuccessSnackbarComponent, {
              duration: 3000,
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
}
