import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../../shared/services/projects.service';
import * as ProjectActions from '../actions/projects.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectEffects {
  constructor(
    private $actions: Actions,
    private projectService: ProjectsService,
  ) {}

  getAllProjects = createEffect(() => {
    return this.$actions.pipe(
      ofType(ProjectActions.getAllProjects),
      exhaustMap(() =>
        this.projectService.getProjects().pipe(
          map(fetchedProjects =>
            ProjectActions.getAllProjectsSuccess({
              projects: fetchedProjects,
            }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  getProjectById = createEffect(() => {
    return this.$actions.pipe(
      ofType(ProjectActions.getProjectById),
      exhaustMap(({ id }) =>
        this.projectService.getProjectById(id).pipe(
          map(fetchedProject =>
            ProjectActions.getProjectByIdSuccess({
              project: fetchedProject,
            }),
          ),
        ),
      ),
    );
  });
}
