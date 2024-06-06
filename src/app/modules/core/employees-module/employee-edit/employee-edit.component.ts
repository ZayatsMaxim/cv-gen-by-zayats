import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEmployee } from '../../../../store/selectors/employee.selectors';
import { getEmployeeById } from '../../../../store/actions/employee.actions';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent {
  employee$: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employee$ = this.store.select(selectEmployee);
      this.fetchEmployee(params['id']);
    });
  }

  fetchEmployee(id: number) {
    this.store.dispatch(getEmployeeById({ id }));
  }
}
