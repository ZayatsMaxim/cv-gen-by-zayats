import { Injectable } from '@angular/core'
import { Tokens } from '../models/responses'

@Injectable({
    providedIn: 'root',
})
export class UserTokenStorageService {
    constructor() {}

    setTokens(token: Tokens) {
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
