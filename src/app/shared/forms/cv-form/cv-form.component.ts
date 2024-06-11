import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CV } from '../../models/cv.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedService } from '../../services/shared.service';
import { forkJoin, map, Observable } from 'rxjs';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { CvEmployeeLanguageFormComponent } from '../cv-employee-language-form/cv-employee-language-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CvDTO } from '../../models/dto.model';
import { select, Store } from '@ngrx/store';
import { saveNewCv, updateCvById } from '../../../store/actions/cv.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  selectProjectByName,
  selectProjectsNames,
} from '../../../store/selectors/project.selectors';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'cv-form',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    MatExpansionModule,
    TextInputComponent,
    DropdownListComponent,
    CvEmployeeLanguageFormComponent,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatSelectModule,
    ProjectFormComponent,
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
  skills?: string[];
  projectsNames: string[];

  existingProjectsNames$: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {}

  get projectsControlsArray() {
    return this.cvForm.get('projects') as FormArray;
  }

  get languagesControlsArray() {
    return this.cvForm.get('languages') as FormArray;
  }

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      cvName: [this.CV.cvName, Validators.required],
      firstName: [this.CV.firstName, Validators.required],
      lastName: [this.CV.lastName, Validators.required],
      email: [this.CV.email, [Validators.required, Validators.email]],
      specialization: [this.CV.specialization.name, Validators.required],
      department: [this.CV.department.name, Validators.required],
      employeeId: this.CV.employeeId,
      skills: [''],
      languages: this.formBuilder.array([]),
      projects: this.formBuilder.array([]),
    });

    const names = this.CV.skills.map(skill => skill.name);
    this.cvForm.get('skills').setValue(names);

    this.sharedService.getDepartments().subscribe(options => {
      this.departments = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSkills().subscribe(options => {
      this.skills = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.existingProjectsNames$ = this.store.select(selectProjectsNames);

    this.createProjectsForms();
    this.setLanguages();
  }

  ngOnChanges(): void {
    if (!this.cvForm) return;

    this.cvForm.patchValue({
      cvName: this.CV.cvName,
      firstName: this.CV.firstName,
      lastName: this.CV.lastName,
      email: this.CV.email,
      specialization: this.CV.specialization.name,
      department: this.CV.department.name,
      employeeId: this.CV.employeeId,
      skills: this.CV.skills.map(skill => skill.name),
    });

    this.projectsControlsArray.clear();
    this.languagesControlsArray.clear();
    this.createProjectsForms();
    this.setLanguages();
  }

  createProjectsForms(): void {
    const projectsControls = this.CV.cvsProjects.map(project =>
      this.formBuilder.group({
        projectName: [project.projectName, Validators.required],
        teamSize: [project.teamSize, Validators.required],
        description: [project.description, Validators.required],
        teamRoles: [
          project.teamRoles.map(role => role.name),
          Validators.required,
        ],
        techStack: [
          project.techStack.map(tech => tech.name),
          Validators.required,
        ],
        responsibilities: [
          project.responsibilities.map(resp => resp.name),
          Validators.required,
        ],
        startDate: [project.startDate, Validators.required],
        endDate: [project.endDate, Validators.required],
      }),
    );

    for (const projectControl of projectsControls) {
      this.projectsControlsArray.push(projectControl);
    }

    this.projectsNames = this.CV.cvsProjects.map(
      project => project.projectName,
    );
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

  saveCv() {
    if (!this.cvForm.valid) return;

    const cvDto: CvDTO = {
      cvName: this.cvForm.value.cvName,
      language: this.cvForm.value.languages.map(
        (language: { name: string; level: string }) => {
          return {
            name: {
              name: language.name,
            },
            level: {
              name: language.level,
            },
          };
        },
      ),
      skills: this.cvForm.value.skills,
      firstName: this.cvForm.value.firstName,
      lastName: this.cvForm.value.lastName,
      email: this.cvForm.value.email,
      department: this.cvForm.value.department,
      specialization: this.cvForm.value.specialization,
      employeeId: this.cvForm.value.employeeId,
      projects: this.cvForm.value.projects,
    };

    if (this.CV.id === -1) {
      this.store.dispatch(saveNewCv({ cv: cvDto }));
    } else {
      this.store.dispatch(updateCvById({ id: this.CV.id, cv: cvDto }));
    }
  }

  // name: {
  //   name: string;
  // };
  // level: {
  //   name: string;
  // };

  addLanguage() {
    this.languagesControlsArray.push(
      this.formBuilder.control({
        name: '',
        level: '',
      }),
    );
  }

  removeLanguage(index: number) {
    this.languagesControlsArray.removeAt(index);
  }

  addProject() {
    const newProjectName: string = generateNewProjectName(
      this.projectsNames,
    ).next().value;
    this.projectsNames.push(newProjectName);

    this.projectsControlsArray.push(
      this.formBuilder.group({
        projectName: [newProjectName, Validators.required],
        teamSize: [0, Validators.required],
        description: ['', Validators.required],
        teamRoles: [[''], Validators.required],
        techStack: [[''], Validators.required],
        responsibilities: [[''], Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
    );
  }

  deleteProject(index: number) {
    this.projectsControlsArray.removeAt(index);
    this.projectsNames.splice(index, 1);
  }

  onAddExistingProjectOptionSelected($event: MatSelectChange) {
    const selectedProject$ = this.store.select(
      selectProjectByName($event.value),
    );
    selectedProject$.subscribe(selectedProject => {
      this.projectsNames.push(selectedProject.projectName);
      this.projectsControlsArray.push(
        this.formBuilder.group({
          projectName: [selectedProject.projectName, Validators.required],
          teamSize: [selectedProject.teamSize, Validators.required],
          description: [selectedProject.description, Validators.required],
          teamRoles: [
            selectedProject.teamRoles.map(role => role.name),
            Validators.required,
          ],
          techStack: [
            selectedProject.techStack.map(tech => tech.name),
            Validators.required,
          ],
          responsibilities: [
            selectedProject.responsibilities.map(resp => resp.name),
            Validators.required,
          ],
          startDate: [selectedProject.startDate, Validators.required],
          endDate: [selectedProject.endDate, Validators.required],
        }),
      );
    });
  }
}

function* generateNewProjectName(
  existingNames: string[],
  baseName = 'New Project',
): IterableIterator<string> {
  let counter = 1;
  while (true) {
    const name = `${baseName} ${counter}`;
    if (!existingNames.includes(name)) {
      yield name;
      counter++;
    } else {
      counter++;
    }
  }
}
