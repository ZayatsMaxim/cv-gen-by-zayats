import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../../shared/services/projects.service';
import * as ProjectActions from '../actions/projects.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/notifications/snackbar/snackbar.component';

@Injectable()
export class ProjectEffects {
  constructor(
    private $actions: Actions,
    private projectService: ProjectsService,
    private snackBar: MatSnackBar,
  ) {}

  getAllProjects$ = createEffect(() => {
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

  getProjectById$ = createEffect(() => {
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

  createProject$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(ProjectActions.createProject),
      exhaustMap(({ project }) =>
        this.projectService.createProject(project).pipe(
          map(createdProject => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'PROJECT_CREATE_SUCCESS_SNACKBAR',
            });
            return ProjectActions.createProjectSuccess({
              project: createdProject,
            });
          }),
        ),
      ),
    );
  });

  updateProject$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(ProjectActions.updateProjectById),
      exhaustMap(({ id, project }) =>
        this.projectService.updateProjectById(id, project).pipe(
          map(updatedProject => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: 'PROJECT_UPDATE_SUCCESS_SNACKBAR',
            });
            return ProjectActions.updateProjectSuccess({
              updatedProject: updatedProject,
            });
          }),
        ),
      ),
    );
  });
}
