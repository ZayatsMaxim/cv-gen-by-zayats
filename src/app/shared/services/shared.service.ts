import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
    baseUrl,
    responsibilitiesUrl,
    rolesUrl,
    skillsUrl,
} from '../url-consts'
import { map } from 'rxjs'
import { Shared } from '../models/shared.model'

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private httpClient: HttpClient) {}

    getTeamRoles() {
        return this.httpClient.get(`${baseUrl}/${rolesUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getSkills() {
        return this.httpClient.get(`${baseUrl}/${skillsUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }

    getResponsibilities() {
        return this.httpClient.get(`${baseUrl}/${responsibilitiesUrl}`).pipe(
            map(response => {
                return response as Shared[]
            }),
        )
    }
}
