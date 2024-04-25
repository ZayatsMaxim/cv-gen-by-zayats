import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvListComponent } from '../../../../shared/inputs/cv-list/cv-list.component';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [CommonModule, CvListComponent],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvComponent {}
