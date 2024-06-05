import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeesUrl, projectUrl } from '../consts/api-routes.consts';
import { map } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeDTO } from '../models/dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get(`${employeesUrl}`).pipe(
      map(response => {
        return response as Employee[];
      }),
    );
  }

  getEmployeeById(id: number) {
    return this.httpClient.get(`${employeesUrl}/${id}`).pipe(
      map(response => {
        return response as Employee;
      }),
    );
  }

  getEmployeeNameById(id: number) {
    return this.httpClient.get(`${employeesUrl}/${id}`).pipe(
      map(response => {
        return `${(response as Employee).firstName} ${(response as Employee).lastName}`;
      }),
    );
  }

  updateEmployeeById(id: number, employee: EmployeeDTO) {
    return this.httpClient.put(`${employeesUrl}/${id}`, employee).pipe(
      map(response => {
        return response as Employee;
      }),
    );
  }
}
