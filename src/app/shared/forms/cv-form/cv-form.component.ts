import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CV } from '../../models/cv.model';
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
export class CvFormComponent implements OnInit, OnChanges {
  @Input() CV: CV;
  cvForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  get projectsControlsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  ngOnInit(): void {
    console.log(this.CV);

    this.cvForm = this.formBuilder.group({
      employee: this.formBuilder.control({
        firstName: this.CV.firstName,
        lastName: this.CV.lastName,
        email: this.CV.email,
        specialization: this.CV.specialization.name,
        department: this.CV.department.name,
      }),
      projects: this.formBuilder.array([]),
    });

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
  }

  ngOnChanges(): void {
    this.cvForm.patchValue({
      employee: {
        firstName: this.CV.firstName,
        lastName: this.CV.lastName,
        email: this.CV.email,
        specialization: this.CV.specialization.name,
        department: this.CV.department.name,
      },
    });

    const projects = this.CV.cvsProjects;

    projects.forEach(project => {
      const control = this.projectsControlsArray.controls.find(
        control => control.get('projectName').value === project.projectName,
      );
    });

    // for (let i = 0; i < projects.length; i++) {
    //   this.projectsControlsArray.controls[i].patchValue({
    //     projectName: projects[i].projectName,
    //     teamSize: projects[i].teamSize,
    //     description: projects[i].description,
    //     teamRoles: projects[i].teamRoles.map(role => role.name),
    //     techStack: projects[i].techStack.map(tech => tech.name),
    //     responsibilities: projects[i].responsibilities.map(resp => resp.name),
    //     startDate: projects[i].startDate,
    //     endDate: projects[i].endDate,
    //   });
    // }
  }
}
