import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserTokenStorageService } from '../services/user-token-storage.service';
import { catchError, throwError } from 'rxjs';

export const httpRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(UserTokenStorageService).getAccessToken();
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        const refreshToken = inject(UserTokenStorageService).getRefreshToken();
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }),
        );
      }
      return throwError(() => error.message);
    }),
  );
};
