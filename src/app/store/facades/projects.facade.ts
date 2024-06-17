import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProject,
  selectProjectByName,
  selectProjectsList,
  selectProjectsNames,
} from '../selectors/project.selectors';
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  updateProjectById,
} from '../actions/projects.actions';
import { ProjectDTO } from '../../shared/models/dto.model';
import { Project } from '../../shared/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  constructor(private store: Store) {}

  selectProject() {
    return this.store.select(selectProject);
  }

  selectProjectsList() {
    return this.store.select(selectProjectsList);
  }

  selectProjectNames() {
    return this.store.select(selectProjectsNames);
  }

  selectProjectByName(name: string) {
    return this.store.select(selectProjectByName(name));
  }

  getAllProjects() {
    this.store.dispatch(getAllProjects());
  }

  createProject(project: ProjectDTO) {
    this.store.dispatch(createProject({ project: project }));
  }

  getProjectById(id: number) {
    this.store.dispatch(getProjectById({ id: id }));
  }

  updateProjectById(id: number, project: ProjectDTO) {
    this.store.dispatch(updateProjectById({ id: id, project: project }));
  }

  deletProjectById(id: number) {
    this.store.dispatch(deleteProjectById({ id: id }));
  }
}
