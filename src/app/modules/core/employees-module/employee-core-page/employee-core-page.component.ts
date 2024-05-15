import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-core-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-core-page.component.html',
  styleUrl: './employee-core-page.component.scss',
})
export class EmployeeCorePageComponent {}
