import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpRequestsInterceptor } from './shared/interceptors/http-requests.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  employeeReducer,
  employeesListReducer,
} from './store/reducers/employee.reducers';
import { EmployeeEffects } from './store/effects/employee.effects';
import { ProjectEffects } from './store/effects/project.effects';
import {
  projectReducer,
  projectsListReducer,
} from './store/reducers/project.reducers';
import { reduce } from 'rxjs';
import { CvEffects } from './store/effects/cv.effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpRequestsInterceptor]),
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:4200'],
        },
      }),
    ),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'project', reducer: projectReducer }),
    provideState({ name: 'employee', reducer: employeeReducer }),
    provideState({ name: 'employeesList', reducer: employeesListReducer }),
    provideState({ name: 'projectsList', reducer: projectsListReducer }),
    provideEffects(EmployeeEffects, ProjectEffects, CvEffects),
  ],
};
