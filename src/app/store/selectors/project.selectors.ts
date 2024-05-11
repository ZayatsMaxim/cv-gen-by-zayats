import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '../../shared/models/project.model';

export const selectProjectState = createFeatureSelector<Project>('project');
export const selectProjectsListState =
  createFeatureSelector<Project[]>('projectsList');

export const selectProject = createSelector(
  selectProjectState,
  (state: Project) => state,
);

export const selectProjectsList = createSelector(
  selectProjectsListState,
  (state: Project[]) => state,
);
