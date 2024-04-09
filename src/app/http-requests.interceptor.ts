import type { HttpInterceptorFn } from '@angular/common/http'

const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1ha3NpbS56YXlhdHNAaW5ub3dpc2UuY29tIiwiaWF0IjoxNzEyNjUyNzk3LCJleHAiOjE3MTI2NTYzOTd9.-vvAsMNucxU0RleAVPUHRn_i-h_bHfO06-OVKlsBqho'

export const httpRequestsInterceptor: HttpInterceptorFn = (req, next) => {
    return next(
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        }),
    )
}
