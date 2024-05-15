import { Routes } from '@angular/router';
import { CoreComponent } from './modules/core/core.component';
import { AuthComponent } from './modules/auth/auth.component';
import { EmployeesListComponent } from './modules/core/employees-module/employees-list/employees-list.component';
import { ProjectListComponent } from './modules/core/projects-module/project-list/project-list.component';
import { ProjectEditComponent } from './modules/core/projects-module/project-edit/project-edit.component';
import { authGuard } from './shared/guards/auth.guard';
import { EmployeeEditComponent } from './modules/core/employees-module/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './modules/core/employees-module/employee-create/employee-create.component';
import { EmployeeCorePageComponent } from './modules/core/employees-module/employee-core-page/employee-core-page.component';
import { ProjectsCorePageComponent } from './modules/core/projects-module/projects-core-page/projects-core-page.component';

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
    path: 'home/employees',
    redirectTo: 'home/employees/list',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: 'home/employees/list',
    pathMatch: 'full',
  },
  {
    path: 'home/projects',
    redirectTo: 'home/projects/list',
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
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'employees',
        component: EmployeeCorePageComponent,
        title: 'Employees',
        data: { breadcrumb: 'Employees' },
        children: [
          {
            path: 'list',
            component: EmployeesListComponent,
            title: 'Employees List',
            data: { breadcrumb: 'List' },
          },
          {
            path: 'edit/:id',
            component: EmployeeEditComponent,
            title: 'Edit employee',
            data: { breadcrumb: 'Edit employee' },
          },
          {
            path: 'create',
            component: EmployeeCreateComponent,
            title: 'Create Employee',
            data: { breadcrumb: 'Create new employee' },
          },
        ],
      },
      {
        path: 'projects',
        component: ProjectsCorePageComponent,
        title: 'Projects',
        data: { breadcrumb: 'Projects' },
        children: [
          {
            path: 'list',
            component: ProjectListComponent,
            title: 'Projects List',
            data: { breadcrumb: 'List' },
          },
          {
            path: 'edit/:id',
            component: ProjectEditComponent,
            title: 'Project Info',
            data: { breadcrumb: 'Edit project' },
          },
          {
            path: 'create',
            component: ProjectEditComponent,
            title: 'Create Project',
            data: { breadcrumb: 'Create new project' },
          },
        ],
      },
    ],
  },
];
