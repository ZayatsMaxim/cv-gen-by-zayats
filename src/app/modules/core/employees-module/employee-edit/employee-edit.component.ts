import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee.model';
import { Observable } from 'rxjs';
import { EmployeesFacade } from '../../../../store/facades/employees.facade';

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
    private employeesFacade: EmployeesFacade,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employee$ = this.employeesFacade.selectEmployee$();
      const id = params['id'] as number;
      this.employeesFacade.getEmployeeById(id);
    });
  }
}
