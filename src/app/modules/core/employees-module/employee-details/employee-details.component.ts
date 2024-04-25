import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeCvComponent } from '../employee-cv/employee-cv.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeCvComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {}
