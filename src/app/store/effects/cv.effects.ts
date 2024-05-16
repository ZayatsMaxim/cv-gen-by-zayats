import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../shared/services/cv.service';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import * as CvActions from '../actions/cv.actions';

@Injectable()
export class CvEffects {
  constructor(
    private $actions: Actions,
    private cvService: CvService,
  ) {}

  getCvById$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.getCvById),
      exhaustMap(({ id }) =>
        this.cvService.getCvById(id).pipe(
          map(CV => CvActions.getCvByIdSuccess({ cv: CV })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  saveCv$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(CvActions.updateCvById),
      exhaustMap(({ id, cv }) =>
        this.cvService.updateCvById(id, cv).pipe(
          map(CV => CvActions.updateCvSuccess({ cv: CV })),
          catchError(error => of(CvActions.updateCvError({ message: error }))),
        ),
      ),
    );
  });
}
