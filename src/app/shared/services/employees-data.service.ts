import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl, projectUrl } from '../url-consts'
import { map } from 'rxjs'
import { Employee } from '../models/employee.model'

@Injectable({
    providedIn: 'root',
})
export class EmployeesDataService {
    constructor(private httpClient: HttpClient) {}

    getEmployees() {
        return this.httpClient.get(`${baseUrl}/${projectUrl}`).pipe(
            map(response => {
                return response as Employee[]
            }),
        )
    }

    getEmployeeById(id: number) {
        return this.httpClient.get(`${baseUrl}/${projectUrl}/${id}`).pipe(
            map(response => {
                response as Employee
            }),
        )
    }
}
