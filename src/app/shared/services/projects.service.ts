import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectUrl } from '../consts/api-routes.consts';
import { Project } from '../models/project.model';
import { ProjectDTO } from '../models/dto.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  getProjectById(id: number) {
    return this.httpClient.get(`${projectUrl}/${id}`).pipe(
      map(response => {
        return response as Project;
      }),
    );
  }

  getProjects() {
    return this.httpClient.get(`${projectUrl}`).pipe(
      map(response => {
        return response as Project[];
      }),
    );
  }

  addProject(project: ProjectDTO) {
    return this.httpClient.post(`${projectUrl}`, project).pipe(
      map(response => {
        return response as Project;
      }),
    );
  }
}
