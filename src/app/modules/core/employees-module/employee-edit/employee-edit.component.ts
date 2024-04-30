import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee.model';
import { EmployeesDataService } from '../../../../shared/services/employees-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent implements OnInit {
  employee: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employee = this.employeeService.getEmployeeById(params['id']);
    });
  }
}
