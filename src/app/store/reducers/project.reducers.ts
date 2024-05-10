import { createReducer, on } from '@ngrx/store';
import { Project } from '../../shared/models/project.model';
import * as ProjectActions from '../actions/projects.actions';

export const projectInitialState: Project = null;

export const projectReducer = createReducer(
  projectInitialState,
  on(
    ProjectActions.getProjectByIdSuccess,
    (state, { project }): Project => ({
      ...state,
      ...project,
    }),
  ),
);
