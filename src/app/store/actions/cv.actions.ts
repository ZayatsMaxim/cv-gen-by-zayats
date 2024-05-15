import { createAction, props } from '@ngrx/store';
import { CvDTO } from '../../shared/models/dto.model';
import { CV } from '../../shared/models/cv.model';

export const getCvById = createAction(
  '[Employee CV Page] Get CV',
  props<{ id: number }>(),
);

export const getCvByIdSuccess = createAction(
  '[CV Effects] Get CV Success',
  props<{ cv: CV }>(),
);

export const updateCvById = createAction(
  '[Employee CV Page] Update CV',
  props<{ id: number; cv: CvDTO }>(),
);

export const createNewCv = createAction(
  '[Employee CV page] Create New CV',
  props<{ cv: CV }>(),
);

export const saveCv = createAction(
  '[Employee CV Page] Save CV',
  props<{ cv: CvDTO }>(),
);

export const deleteCvById = createAction(
  '[Employee CV Page] Delete CV',
  props<{ id: number }>(),
);
