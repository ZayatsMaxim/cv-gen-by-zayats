import { createAction, props } from '@ngrx/store';
import { CvDTO } from '../../shared/models/dto.model';
import { CV } from '../../shared/models/cv.model';

export const getCvById = createAction(
  '[Employee CV Page] Get CV',
  props<{ id: number }>(),
);

export const getCvByIdSuccess = createAction(
  '[Employee Effect] Get CV Success',
  props<{ cv: CV }>(),
);

export const updateCvById = createAction(
  '[Employee CV Page] Update CV',
  props<{ id: number; cv: CvDTO }>(),
);

export const createCv = createAction(
  '[Employee CV Page] Create CV',
  props<{ cv: CvDTO }>(),
);

export const deleteCvById = createAction(
  '[Employee CV Page] Delete CV',
  props<{ id: number }>(),
);
