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
import { ProjectFormComponent } from '../../../../shared/forms/project-form/project-form.component';
import { ProjectDTO } from '../../../../shared/models/dto.model';
import { ProjectsFacade } from '../../../../store/facades/projects.facade';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    ProjectFormComponent,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {
  projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade,
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

    this.projectsFacade.createProject(projectDto);
  }
}
