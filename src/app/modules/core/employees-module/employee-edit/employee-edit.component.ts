import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent {}
