import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeFormComponent } from '../../../../shared/forms/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent {}
