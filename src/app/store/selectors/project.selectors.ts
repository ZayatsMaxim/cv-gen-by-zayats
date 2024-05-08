import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '../../shared/models/project.model';

export const selectProjectState = createFeatureSelector<Project>('project');

export const selectProject = createSelector(
  selectProjectState,
  (state: Project) => state,
);
