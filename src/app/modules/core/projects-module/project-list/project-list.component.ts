import { CommonModule, formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BaseListComponent } from '../../../../shared/base-list/base-list.component';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/models/project.model';
import { Store } from '@ngrx/store';
import { selectProjectsList } from '../../../../store/selectors/project.selectors';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

export interface ProjectTableData {
  name: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  techStack: string;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, BaseListComponent, TranslateModule, MatButtonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
  projectsList$: Observable<Project[]>;

  headers = [
    'PROJECTS_TABLE_HEADER_NAME',
    'PROJECTS_TABLE_HEADER_START_DATE',
    'PROJECTS_TABLE_HEADER_END_DATE',
    'PROJECTS_TABLE_HEADER_TEAM_SIZE',
    'PROJECTS_TABLE_HEADER_TECH_STACK',
  ];
  tableBody: ProjectTableData[];
  routerLinks: string[];

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.projectsList$ = this.store.select(selectProjectsList);
  }

  ngOnInit(): void {
    this.projectsList$.subscribe((projects: Project[]) => {
      if (projects) {
        this.tableBody = this.mapProjectsToTableData(projects);
        this.routerLinks = this.mapRouterLinks(projects);
        this.cdr.detectChanges();
      }
    });
  }

  private mapProjectsToTableData(projects: Project[]): ProjectTableData[] {
    return projects.map(project => ({
      name: project.projectName,
      startDate: formatDate(project.startDate, 'dd/MM/yyyy', 'en-US'),
      endDate: formatDate(project.endDate, 'dd/MM/yyyy', 'en-US'),
      teamSize: project.teamSize,
      techStack: project.techStack.map(project => project.name).join(','),
    }));
  }

  private mapRouterLinks(employees: Project[]): string[] {
    return employees.map(employee => `/home/projects/edit/${employee.id}`);
  }

  navigateToCreateProject() {
    this.router.navigate(['/home/projects/create']);
  }
}
