import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl, projectUrl } from '../url-consts'
import { Project } from '../models/project.model'
import { ProjectDTO } from '../models/dto.model'
import { map } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ProjectsDataApiService {
    constructor(private httpClient: HttpClient) {}

    getProjectById(id: number) {
        return this.httpClient.get(`${baseUrl}/${projectUrl}/${id}`)
    }

    getProjects() {
        return this.httpClient.get(`${baseUrl}/${projectUrl}`).pipe(
            map(response => {
                return response as Project[]
            }),
        )
    }

    addProject(project: ProjectDTO) {
        return this.httpClient.post(`${baseUrl}/${projectUrl}`, project).pipe(
            map(response => {
                return response as Project
            }),
        )
    }
}
