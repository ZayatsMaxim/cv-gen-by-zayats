import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
    departmentsUrl,
    responsibilitiesUrl,
    rolesUrl,
    skillsUrl,
    specializationsUrl,
} from '../consts/api-routes.consts'
import { map } from 'rxjs'
import { Shared } from '../models/shared.model'

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private httpClient: HttpClient) {}

    getTeamRoles() {
        return this.httpClient.get(`${rolesUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getSkills() {
        return this.httpClient.get(`${skillsUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getResponsibilities() {
        return this.httpClient.get(`${responsibilitiesUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getSpecializations() {
        return this.httpClient.get(`${specializationsUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getDepartments() {
        return this.httpClient.get(`${departmentsUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }
}
