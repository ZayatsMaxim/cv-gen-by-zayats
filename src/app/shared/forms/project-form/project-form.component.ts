import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { NumberInputComponent } from '../../inputs/number-input/number-input.component';
import { TextAreaInputComponent } from '../../inputs/text-area-input/text-area-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { DatePickerComponent } from '../../inputs/date-picker/date-picker.component';

@Component({
  selector: 'project-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextInputComponent,
    NumberInputComponent,
    TextAreaInputComponent,
    DropdownListComponent,
    DatePickerComponent,
  ],
  templateUrl: './project-form.component.html',
  styleUrls: [
    './project-form.component.scss',
    '../../styles/inputs.scss',
    '../../styles/form.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
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
  onChange = (value: any) => {};

  roles?: string[];
  techs?: string[];
  responsibilities?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
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
      this.cdr.detectChanges();
    });

    this.sharedService.getResponsibilities().subscribe(options => {
      this.responsibilities = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSkills().subscribe(options => {
      this.techs = options.map(option => option.name);
      this.cdr.detectChanges();
    });
  }

  writeValue(obj: { [key: string]: unknown }): void {
    this.projectForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.projectForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
