import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectFormComponent } from '../../../../shared/forms/project-form/project-form.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { selectProject } from '../../../../store/selectors/project.selectors';
import {
  getProjectById,
  updateProjectById,
} from '../../../../store/actions/projects.actions';
import { NewProjectFormComponent } from '../../../../shared/forms/new-project-form/new-project-form.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectDTO } from '../../../../shared/models/dto.model';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    CommonModule,
    ProjectFormComponent,
    ReactiveFormsModule,
    NewProjectFormComponent,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  project$: Observable<Project>;
  projectId: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.projectForm = this.formBuilder.group({
      project: this.formBuilder.group({
        projectName: ['', Validators.required],
        teamSize: ['', Validators.required],
        description: ['', Validators.required],
        teamRoles: [[''], Validators.required],
        techStack: [[''], Validators.required],
        responsibilities: [[''], Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.store.dispatch(getProjectById({ id: this.projectId }));
      this.project$ = this.store.select(selectProject);
      this.fetchProject();
    });
  }

  ngOnChanges(): void {
    this.fetchProject();
  }

  fetchProject() {
    this.project$.subscribe(fetchedProject => {
      if (!fetchedProject) return;

      this.projectForm.get(['project']).patchValue({
        projectName: fetchedProject.projectName,
        teamSize: fetchedProject.teamSize,
        description: fetchedProject.description,
        teamRoles: fetchedProject.teamRoles.map(role => role.name),
        techStack: fetchedProject.techStack.map(tech => tech.name),
        responsibilities: fetchedProject.responsibilities.map(
          resp => resp.name,
        ),
        startDate: fetchedProject.startDate,
        endDate: fetchedProject.endDate,
      });
    });
  }

  updateProject() {
    if (!this.projectForm.valid) {
      this.projectForm.get(['project']).markAllAsTouched();
      return;
    }

    const projectDto: ProjectDTO = {
      projectName: this.projectForm.get(['project']).get(['projectName']).value,
      description: this.projectForm.get(['project']).get(['description']).value,
      startDate: this.projectForm.get(['project']).get(['startDate']).value,
      endDate: this.projectForm.get(['project']).get(['endDate']).value,
      teamSize: this.projectForm.get(['project']).get(['teamSize']).value,
      techStack: this.projectForm.get(['project']).get(['techStack']).value,
      responsibilities: this.projectForm
        .get(['project'])
        .get(['responsibilities']).value,
      teamRoles: this.projectForm.get(['project']).get(['teamRoles']).value,
    };

    this.store.dispatch(
      updateProjectById({ id: this.projectId, project: projectDto }),
    );
  }
}
