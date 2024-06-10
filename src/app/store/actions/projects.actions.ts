import { createAction, props } from '@ngrx/store';
import { ProjectDTO } from '../../shared/models/dto.model';
import { Project } from '../../shared/models/project.model';

export const getAllProjects = createAction(
  '[Projects List Page] Get All Projects',
);

export const getAllProjectsSuccess = createAction(
  '[Project Effects] Get All Projects Success',
  props<{ projects: Project[] }>(),
);

export const createProject = createAction(
  '[Project Create Page] Create Project',
  props<{ project: ProjectDTO }>(),
);

export const createProjectSuccess = createAction(
  '[Project Effects] Create Project Success',
  props<{ project: Project }>(),
);

export const getProjectById = createAction(
  '[Project Edit Page] Get Project',
  props<{ id: number }>(),
);

export const getProjectSuccess = createAction(
  '[Project Effects] Get Project Success',
  props<{ project: Project }>(),
);

export const updateProjectById = createAction(
  '[Project Edit Page] Update Project',
  props<{ id: number; project: ProjectDTO }>(),
);

export const updateProjectSuccess = createAction(
  '[Project Effects] Update Project Success',
  props<{ updatedProject: Project }>(),
);

export const deleteProjectById = createAction(
  '[Project Edit Page] Delete Project',
  props<{ id: number }>(),
);

export const deleteProjectSuccess = createAction(
  '[Project Edit Page] Delete Project Success',
  props<{ id: number }>(),
);
