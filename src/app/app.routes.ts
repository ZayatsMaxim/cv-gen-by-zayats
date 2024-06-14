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
import { ProjectCreateComponent } from './modules/core/projects-module/project-create/project-create.component';

export const routes: Routes = [
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
    data: { breadcrumb: 'BREADCRUMB_HOME' },
    children: [
      {
        path: 'employees',
        component: EmployeeCorePageComponent,
        title: 'Employees',
        data: { breadcrumb: 'BREADCRUMB_EMPLOYEES' },
        children: [
          {
            path: 'list',
            component: EmployeesListComponent,
            title: 'Employees List',
            data: { breadcrumb: 'BREADCRUMB_LIST' },
          },
          {
            path: 'edit/:id',
            component: EmployeeEditComponent,
            title: 'Edit employee',
            data: { breadcrumb: 'BREADCRUMB_EDIT_EMPLOYEE' },
          },
          {
            path: 'create',
            component: EmployeeCreateComponent,
            title: 'Create Employee',
            data: { breadcrumb: 'BREADCRUMB_CREATE_NEW_EMPLOYEE' },
          },
        ],
      },
      {
        path: 'projects',
        component: ProjectsCorePageComponent,
        title: 'Projects',
        data: { breadcrumb: 'BREADCRUMB_PROJECTS' },
        children: [
          {
            path: 'list',
            component: ProjectListComponent,
            title: 'Projects List',
            data: { breadcrumb: 'BREADCRUMB_LIST' },
          },
          {
            path: 'edit/:id',
            component: ProjectEditComponent,
            title: 'Project Info',
            data: { breadcrumb: 'BREADCRUMB_EDIT_PROJECT' },
          },
          {
            path: 'create',
            component: ProjectCreateComponent,
            title: 'Create Project',
            data: { breadcrumb: 'BREADCRUMB_CREATE_NEW_PROJECT' },
          },
        ],
      },
    ],
  },
];
