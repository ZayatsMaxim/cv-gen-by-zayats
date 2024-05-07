import { createAction, props } from '@ngrx/store';
import { ProjectDTO } from '../../shared/models/dto.model';

export const getAllProjects = createAction(
  '[Projects List Page] Get All Projects',
);

export const createProject = createAction(
  '[Project Create Page] Create Project',
  props<{ project: ProjectDTO }>(),
);

export const getProjectById = createAction(
  '[Project Edit Page] Get Project',
  props<{ id: number }>(),
);

export const updateProjectById = createAction(
  '[Project Edit Page] Update Project',
  props<{ id: number; project: ProjectDTO }>(),
);
