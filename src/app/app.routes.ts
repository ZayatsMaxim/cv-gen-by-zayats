import { Routes } from '@angular/router'
import { CoreComponent } from './modules/core/core.component'
import { AuthComponent } from './modules/auth/auth.component'
import { EmployeesListComponent } from './modules/core/employees-module/employees-list/employees-list.component'
import { ProjectListComponent } from './modules/core/projects-module/project-list/project-list.component'
import { EmployeeInfoComponent } from './modules/core/employees-module/employee-info/employee-info.component'
import { EmployeeCvComponent } from './modules/core/employees-module/employee-cv/employee-cv.component'
import { ProjectInfoComponent } from './modules/core/projects-module/project-info/project-info.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home/employees',
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
        children: [
            {
                path: 'employees',
                component: EmployeesListComponent,
                title: 'Employees List',
                children: [
                    {
                        path: ':id/info',
                        component: EmployeeInfoComponent,
                        title: 'Employee Info',
                    },
                    {
                        path: ':id/cv',
                        component: EmployeeCvComponent,
                        title: 'Employee CV',
                    },
                ],
            },
            {
                path: 'projects',
                component: ProjectListComponent,
                title: 'Projects List',
                children: [
                    {
                        path: ':id',
                        component: ProjectInfoComponent,
                        title: 'Project Info',
                    },
                ],
            },
        ],
    },
]
