import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NewProjectFormComponent } from '../../../../shared/forms/new-project-form/new-project-form.component';
import { ProjectDTO } from '../../../../shared/models/dto.model';
import { Store } from '@ngrx/store';
import { createProject } from '../../../../store/actions/projects.actions';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    NewProjectFormComponent,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {
  projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.projectForm = this.formBuilder.group({
      project: this.formBuilder.group({
        projectName: ['', Validators.required],
        teamSize: ['', Validators.required],
        description: ['', Validators.required],
        teamRoles: [[], Validators.required],
        techStack: [[], Validators.required],
        responsibilities: [[], Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
    });
  }

  createNewProject() {
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

    this.store.dispatch(createProject({ project: projectDto }));
  }
}
