import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CvListComponent } from '../../../../shared/inputs/cv-list/cv-list.component';
import { CvFormComponent } from '../../../../shared/forms/cv-form/cv-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CV } from '../../../../shared/models/cv.model';

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
export class EmployeeCvComponent implements OnInit {
  @Input() employeeCvs: CV[];
  options: string[];
  selectedCv: CV;

  selectCv(option: string) {
    this.selectedCv = this.employeeCvs.find(CV => CV.cvName === option);
    console.log(this.selectedCv);
  }

  ngOnInit(): void {
    this.options = this.employeeCvs.map(cv => cv.cvName);
  }
}
