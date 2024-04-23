import { Routes } from '@angular/router';
import { CoreComponent } from './modules/core/core.component';
import { AuthComponent } from './modules/auth/auth.component';
import { EmployeesListComponent } from './modules/core/employees-module/employees-list/employees-list.component';
import { ProjectListComponent } from './modules/core/projects-module/project-list/project-list.component';
import { EmployeeInfoComponent } from './modules/core/employees-module/employee-info/employee-info.component';
import { EmployeeCvComponent } from './modules/core/employees-module/employee-cv/employee-cv.component';
import { ProjectEditComponent } from './modules/core/projects-module/project-edit/project-edit.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: '/auth',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Authorize',
  },
  {
    path: 'home',
    component: CoreComponent,
    title: 'Home',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'employees',
        component: EmployeesListComponent,
        title: 'Employees List',
      },
      {
        path: 'employees/:id/info',
        component: EmployeeInfoComponent,
        title: 'Employee Info',
      },
      {
        path: 'employees/:id/cv',
        component: EmployeeCvComponent,
        title: 'Employee CV',
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        title: 'Projects List',
      },
      {
        path: 'projects/:id',
        component: ProjectEditComponent,
        title: 'Project Info',
      },
      {
        path: 'projects/new',
        component: ProjectEditComponent,
        title: 'Project Info',
      },
    ],
  },
];
