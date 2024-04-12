import { Injectable } from '@angular/core'
import { AuthResponse } from '../modules/auth/auth.component'

@Injectable({
    providedIn: 'root',
})
export class UserTokenStorageService {
    constructor() {}

    setTokens(token: AuthResponse) {
        localStorage.setItem('access_token', token.access_token)
        localStorage.setItem('refresh_token', token.refresh_token)
    }

    getAccessToken() {
        return localStorage.getItem('access_token')
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token')
    }

    clearTokens() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}
