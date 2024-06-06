import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EmployeeCvComponent } from '../employee-cv/employee-cv.component';
import { Employee } from '../../../../shared/models/employee.model';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';
import { MatButtonModule } from '@angular/material/button';
import { DropdownListComponent } from '../../../../shared/inputs/dropdown-list/dropdown-list.component';
import { TextInputComponent } from '../../../../shared/inputs/text-input/text-input.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeCvComponent,
    EmployeeFormComponent,
    MatTabsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputComponent,
    DropdownListComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  @Input() employee: Employee;
}
