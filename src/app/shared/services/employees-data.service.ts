import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class EmployeesDataService {
    constructor(private httpClient: HttpClient) {}

    getEmployees() {
        return this.httpClient.get(``)
    }
}
