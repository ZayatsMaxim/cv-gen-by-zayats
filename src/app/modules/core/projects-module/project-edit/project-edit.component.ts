import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectFormComponent } from '../../../../shared/forms/project-form/project-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { selectProject } from '../../../../store/selectors/project.selectors';
import { getProjectById } from '../../../../store/actions/projects.actions';
import { NewProjectFormComponent } from '../../../../shared/forms/new-project-form/new-project-form.component';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    CommonModule,
    ProjectFormComponent,
    ReactiveFormsModule,
    NewProjectFormComponent,
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditComponent implements OnInit {
  projectForm!: FormGroup;
  project$: Observable<Project>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  get projectControl() {
    return this.projectForm.get('project') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.project$ = this.store.select(selectProject);
      this.fetchProject(params['id']);
    });
  }

  fetchProject(id: number) {
    this.project$.subscribe(fetchedProject => {
      this.store.dispatch(getProjectById({ id }));
      if (!fetchedProject) return;
      this.projectForm = this.formBuilder.group({
        project: this.formBuilder.group({
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
        }),
      });
    });
  }
}
