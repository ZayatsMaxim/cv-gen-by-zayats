import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerComponent } from '../../inputs/date-picker/date-picker.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { NumberInputComponent } from '../../inputs/number-input/number-input.component';
import { TextAreaInputComponent } from '../../inputs/text-area-input/text-area-input.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { SharedService } from '../../services/shared.service';

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
})
export class ProjectFormComponent implements OnInit {
  roles?: string[];
  techs?: string[];
  responsibilities?: string[];
  formGroup: FormGroup;

  constructor(
    public controlContainer: ControlContainer,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup;

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
}
