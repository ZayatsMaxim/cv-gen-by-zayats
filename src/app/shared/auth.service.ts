import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { AuthResponse } from '../modules/auth/auth.component'

const baseUrl = 'http://localhost:3000'
const loginUrl = 'api/auth/login'
const logoutUrl = 'api/auth/logout'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(login: string, password: string) {
        return this.httpClient
            .post(`${baseUrl}/${loginUrl}`, {
                email: login,
                password: password,
            })
            .pipe(
                map(response => {
                    return response as AuthResponse
                }),
            )
    }

    logout() {
        return this.httpClient.get(`${baseUrl}/${logoutUrl}`)
    }
}
