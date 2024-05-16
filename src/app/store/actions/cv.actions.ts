import { createAction, props } from '@ngrx/store';
import { CvDTO } from '../../shared/models/dto.model';
import { CV } from '../../shared/models/cv.model';
import { Project } from '../../shared/models/project.model';

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

export const updateCvSuccess = createAction(
  '[CV Effects] Update CV Success',
  props<{ cv: CV }>(),
);

export const updateCvError = createAction(
  '[CV Effects] Update CV Error',
  props<{ message: string }>(),
);

export const createNewCv = createAction(
  '[Employee CV page] Create New CV',
  props<{ cv: CV }>(),
);

export const saveNewCv = createAction(
  '[Employee CV page] Save New CV',
  props<{ cv: CvDTO }>(),
);

export const saveNewCvSuccess = createAction(
  '[CV effects] Save New CV Success',
  props<{ cv: CV }>(),
);

export const deleteCvById = createAction(
  '[Employee CV Page] Delete CV',
  props<{ id: number }>(),
);
