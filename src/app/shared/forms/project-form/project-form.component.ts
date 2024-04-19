import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectFormComponent),
      multi: true,
    },
  ],
})
export class ProjectFormComponent implements ControlValueAccessor, OnInit {
  projectForm!: FormGroup;
  public onTouched: () => void = () => {};

  roles?: string[];
  techs?: string[];
  responsibilities?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      teamSize: [0, Validators.required],
      techStack: [[''], Validators.required],
      responsibilities: [[''], Validators.required],
      teamRoles: [[''], Validators.required],
    });

    this.sharedService.getTeamRoles().subscribe(options => {
      this.roles = options.map(option => option.name);
    });

    this.sharedService.getResponsibilities().subscribe(options => {
      this.responsibilities = options.map(option => option.name);
    });

    this.sharedService.getSkills().subscribe(options => {
      this.techs = options.map(option => option.name);
    });
  }

  writeValue(obj: { [key: string]: unknown }): void {
    obj && this.projectForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.projectForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log(fn);
    this.onTouched = fn;
  }
}
