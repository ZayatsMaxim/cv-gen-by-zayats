import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CvListComponent } from '../../../../shared/inputs/cv-list/cv-list.component';
import { CvFormComponent } from '../../../../shared/forms/cv-form/cv-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CV } from '../../../../shared/models/cv.model';
import { CvService } from '../../../../shared/services/cv.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { createNewCv } from '../../../../store/actions/cv.actions';
import { deleteCvById } from '../../../../store/actions/cv.actions';
import { removeCvFromStoreByName } from '../../../../store/actions/cv.actions';
@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [
    CommonModule,
    CvListComponent,
    CvFormComponent,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvComponent implements OnChanges {
  @Input() employeeCvs: CV[];
  @Input() employeeId: number;

  options: string[];
  selectedCv: CV;

  constructor(
    private cvService: CvService,
    private store: Store,
  ) {}

  selectCv(option: string) {
    this.selectedCv = this.employeeCvs.find(CV => CV.cvName === option);
  }

  deleteCv(option: string) {
    const id = this.employeeCvs.find(CV => CV.cvName === option).id;
    if (id === -1) {
      this.store.dispatch(removeCvFromStoreByName({ cvName: option }));
    } else this.store.dispatch(deleteCvById({ id: id }));
  }

  addCv() {
    const newCV: CV = {
      id: -1,
      cvName: generateNewCVName(this.options).next().value,
      language: [],
      skills: [],
      firstName: '',
      lastName: '',
      email: '',
      department: { id: -1, name: '' },
      departmentId: -1,
      specialization: { id: -1, name: '' },
      specializationId: -1,
      employeeId: this.employeeId,
      cvsProjects: [],
    };
    this.store.dispatch(createNewCv({ cv: newCV }));
    this.options.push(newCV.cvName);
  }

  ngOnChanges(): void {
    this.options = this.employeeCvs.map(cv => cv.cvName);
  }
}

function* generateNewCVName(
  existingNames: string[],
  baseName = 'New CV',
): IterableIterator<string> {
  let counter = 1;
  while (true) {
    const name = `${baseName} ${counter}`;
    if (!existingNames.includes(name)) {
      yield name;
      counter++;
    } else {
      counter++;
    }
  }
}
