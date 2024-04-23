import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectUrl } from '../consts/api-routes.consts';
import { map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesDataService {
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get(`${projectUrl}`).pipe(
      map(response => {
        return response as Employee[];
      }),
    );
  }

  getEmployeeById(id: number) {
    return this.httpClient.get(`${projectUrl}/${id}`).pipe(
      map(response => {
        response as Employee;
      }),
    );
  }
}
