import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CV } from '../../models/cv.model';
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
      employee: this.formBuilder.control({
        firstName: '',
        lastName: '',
        email: '',
        specialization: '',
        department: '',
      }),
      projects: this.formBuilder.array([]),
    });
    this.getCvInfo();
  }

  getCvInfo() {
    this.cvService.getCvById(this.CVid).subscribe(Cv => {
      this.CV = Cv;

      const projectsControls = this.CV.cvsProjects.map(project =>
        this.formBuilder.control({
          projectName: project.projectName,
          teamSize: project.teamSize,
          description: project.description,
          teamRoles: project.teamRoles.map(role => role.name),
          techStack: project.techStack.map(tech => tech.name),
          responsibilities: project.responsibilities.map(resp => resp.name),
          startDate: project.startDate,
          endDate: project.endDate,
        }),
      );

      for (const projectControl of projectsControls) {
        (this.cvForm.get('projects') as FormArray).push(projectControl);
      }

      this.cvForm.get('employee').setValue({
        firstName: this.CV.firstName,
        lastName: this.CV.lastName,
        email: this.CV.email,
        specialization: this.CV.specialization.name,
        department: this.CV.department.name,
      });
    });
  }
}
