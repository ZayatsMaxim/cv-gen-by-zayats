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
import { CvService } from '../../../../shared/services/cv.service';

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

  constructor(private cvService: CvService) {}

  selectCv(option: string) {
    this.selectedCv = this.employeeCvs.find(CV => CV.cvName === option);
  }

  deleteCv(option: string) {
    console.log(option);
    const id = this.employeeCvs.find(CV => CV.cvName === option).id;
    this.cvService.deleteCvById(id);
  }

  ngOnInit(): void {
    this.options = this.employeeCvs.map(cv => cv.cvName);
  }
}
