import { CommonModule } from '@angular/common';
import {
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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';

@Component({
  selector: 'cv-employee-language-form',
  standalone: true,
  imports: [CommonModule, DropdownListComponent, ReactiveFormsModule],
  templateUrl: './cv-employee-language-form.component.html',
  styleUrls: [
    './cv-employee-language-form.component.scss',
    '../../styles/inputs.scss',
    '../../styles/form.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CvEmployeeLanguageFormComponent),
      multi: true,
    },
  ],
})
export class CvEmployeeLanguageFormComponent
  implements ControlValueAccessor, OnInit
{
  languageForm: FormGroup;

  languages?: string[];
  levels?: string[];

  onTouched = () => {};
  onChange = (value: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.languageForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });

    this.sharedService.getLanguages().subscribe(languages => {
      this.languages = languages.map(language => language.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getLevels().subscribe(levels => {
      this.levels = levels.map(level => level.name);
      this.cdr.detectChanges();
    });
  }

  writeValue(obj: { [key: string]: unknown }): void {
    this.languageForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.languageForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
