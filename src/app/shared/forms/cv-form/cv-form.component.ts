import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
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
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { CvEmployeeLanguageFormComponent } from '../cv-employee-language-form/cv-employee-language-form.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TextInputComponent,
    DropdownListComponent,
    CvEmployeeLanguageFormComponent,
    TranslateModule,
  ],
  templateUrl: './cv-form.component.html',
  styleUrls: [
    '../../styles/form.scss',
    './cv-form.component.scss',
    '../../styles/inputs.scss',
  ],
})
export class CvFormComponent implements OnInit, OnChanges {
  @Input() CV: CV;
  cvForm: FormGroup;

  specializations?: string[];
  departments?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  get projectsControlsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  get languagesControlsArray() {
    return this.cvForm.get('languages') as FormArray;
  }

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      firstName: this.CV.firstName,
      lastName: this.CV.lastName,
      email: this.CV.email,
      specialization: this.CV.specialization.name,
      department: this.CV.department.name,
      languages: this.formBuilder.array([]),
      projects: this.formBuilder.array([]),
    });

    this.sharedService.getDepartments().subscribe(options => {
      this.departments = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.createProjectsForms();
    this.setLanguages();
  }

  ngOnChanges(): void {
    if (!this.cvForm) return;

    this.cvForm.patchValue({
      firstName: this.CV.firstName,
      lastName: this.CV.lastName,
      email: this.CV.email,
      specialization: this.CV.specialization.name,
      department: this.CV.department.name,
    });

    this.projectsControlsArray.clear();
    this.languagesControlsArray.clear();
    this.createProjectsForms();
    this.setLanguages();
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
      this.projectsControlsArray.push(projectControl);
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
          this.languagesControlsArray.push(control);
        }
      });
  }
}
