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
import { SharedService } from '../../services/shared.service';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { DropdownListComponent } from '../../inputs/dropdown-list/dropdown-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DropdownListComponent,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: [
    './employee-form.component.scss',
    '../../styles/inputs.scss',
    '../../styles/form.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  formGroup: FormGroup;

  specializations?: string[];
  departments?: string[];

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public controlContainer: ControlContainer,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup;

    this.sharedService.getDepartments().subscribe(options => {
      this.departments = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
      this.cdr.detectChanges();
    });
  }
}
