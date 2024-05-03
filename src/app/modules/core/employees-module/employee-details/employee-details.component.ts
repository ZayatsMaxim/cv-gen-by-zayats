import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EmployeeCvComponent } from '../employee-cv/employee-cv.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { Employee } from '../../../../shared/models/employee.model';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeCvComponent,
    EmployeeInfoComponent,
    MatTabsModule,
    TranslateModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  @Input() employee: Employee;
}
