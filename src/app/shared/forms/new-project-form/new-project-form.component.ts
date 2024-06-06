import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  selector: 'app-new-project-form',
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
  templateUrl: './new-project-form.component.html',
  styleUrl: './new-project-form.component.scss',
})
export class NewProjectFormComponent implements OnInit {
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
    console.log(this.controlContainer.control);

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
