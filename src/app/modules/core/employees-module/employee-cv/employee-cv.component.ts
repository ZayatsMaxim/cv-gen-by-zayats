import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvListComponent } from '../../../../shared/inputs/cv-list/cv-list.component';
import { CvFormComponent } from '../../../../shared/forms/cv-form/cv-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [
    CommonModule,
    CvListComponent,
    CvFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvComponent {
  selectedCv: string;
  cvs: string[] = ['option1', 'option two'];
}
