import type { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { UserTokenStorageService } from '../services/user-token-storage.service'

export const httpRequestsInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = inject(UserTokenStorageService).getAccessToken()
    return next(
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        }),
    )
}
