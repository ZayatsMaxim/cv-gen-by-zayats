import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CV } from '../../models/cv.model';
import { EmployeeDTO } from '../../models/dto.model';
import { CvDataService } from '../../services/cv-data.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'cv-form',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    MatExpansionModule,
    ProjectFormComponent,
    EmployeeFormComponent,
  ],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent implements OnInit {
  @Input() CVid: number = 2;
  CV: CV;
  cvForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CvDataService,
  ) {}

  get projectsControlsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      employeeForm: this.formBuilder.group({
        firstName: ['sdf'],
        lastName: ['sdf'],
        email: ['fdg'],
        specialization: ['Angular'],
        department: ['Javascript'],
      }),
      projects: this.formBuilder.array([]),
    });
    this.getCvProjects();
  }

  getCvProjects() {
    this.cvService.getCvById(this.CVid).subscribe(Cv => {
      // console.log(Cv);
      this.CV = Cv;
      const projectsControls = this.CV.cvsProjects.map(project =>
        this.formBuilder.group({
          projectName: [project.projectName],
          teamSize: [project.teamSize],
          description: [project.description],
          teamRoles: [project.teamRoles],
          techStack: [project.techStack],
          responsibilities: [project.responsibilities],
          startDate: [project.startDate],
          endDate: [project.endDate],
        }),
      );
      console.log(projectsControls);

      (this.cvForm.get('projects') as FormArray).push(projectsControls);
    });
  }
}
