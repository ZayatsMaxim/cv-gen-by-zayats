import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CV } from '../../models/cv.model';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedService } from '../../services/shared.service';
import { forkJoin, map, share } from 'rxjs';

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
  cvForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
  ) {}

  get projectsControlsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  get languagesControlsArray() {
    // const employeeControl = this.cvForm.get('employee') as FormControl;
    // return employeeControl.get('languages') as FormArray;
    return this.cvForm.get('employee').get('languages') as FormArray;
  }

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      employee: this.formBuilder.control({
        firstName: this.CV.firstName,
        lastName: this.CV.lastName,
        email: this.CV.email,
        specialization: this.CV.specialization.name,
        department: this.CV.department.name,
        languages: this.formBuilder.array([]),
      }),
      projects: this.formBuilder.array([]),
    });

    this.createProjectsForms();
    this.setLanguages();
  }

  ngOnChanges(): void {
    if (!this.cvForm) return;

    this.cvForm.patchValue({
      employee: {
        firstName: this.CV.firstName,
        lastName: this.CV.lastName,
        email: this.CV.email,
        specialization: this.CV.specialization.name,
        department: this.CV.department.name,
      },
    });

    this.projectsControlsArray.clear();
    this.createProjectsForms();
  }

  createProjectsForms(): void {
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

  setLanguages() {
    const languagesObservable = this.sharedService.getLanguages();
    const levelsObservable = this.sharedService.getLevels();

    forkJoin([languagesObservable, levelsObservable])
      .pipe(
        map(([languages, levels]) => {
          const languageControlsGroup = this.CV.language.map(language =>
            this.formBuilder.control({
              name: languages.find(lang => language.nameId === lang.id).name,
              level: levels.find(level => language.levelId === level.id).name,
            }),
          );

          return languageControlsGroup;
        }),
      )
      .subscribe(controlGroup => {
        for (const control of controlGroup) {
          // console.log(controlGroup);
          console.log(this.languagesControlsArray);
          console.log(this.cvForm.get('employee'));
          

          this.languagesControlsArray.push(control);
        }

      });

    // const languageControlsGroup = this.CV.language.map(language => {});

    // langAndLevel.push({
    //   name: languages.find(lang => language.nameId === lang.id).name,
    //   level: levels.find(level => language.levelId === level.id).name,
    // });
  }
}
