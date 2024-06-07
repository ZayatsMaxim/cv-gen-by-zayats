import { createReducer, on } from '@ngrx/store';
import { Project } from '../../shared/models/project.model';
import * as ProjectActions from '../actions/projects.actions';

export const projectInitialState: Project = null;
export const projectsListInitialState: Project[] = null;

export const projectReducer = createReducer(
  projectInitialState,
  on(
    ProjectActions.getProjectByIdSuccess,
    (state, { project }): Project => ({
      ...state,
      ...project,
    }),
  ),
  on(
    ProjectActions.updateProjectSuccess,
    (state, { updatedProject }): Project => ({
      ...updatedProject,
    }),
  ),
);

export const projectsListReducer = createReducer(
  projectsListInitialState,
  on(ProjectActions.getAllProjectsSuccess, (state, { projects }): Project[] => [
    ...projects,
  ]),
  on(ProjectActions.createProjectSuccess, (state, { project }): Project[] => [
    ...state,
    project,
  ]),
  on(
    ProjectActions.updateProjectSuccess,
    (state, { updatedProject }): Project[] => {
      const newProjects = [...state];
      newProjects.splice(
        newProjects.findIndex(project => project.id === updatedProject.id),
        1,
        updatedProject,
      );
      return newProjects;
    },
  ),
);
