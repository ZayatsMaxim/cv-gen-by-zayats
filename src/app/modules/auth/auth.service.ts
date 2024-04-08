import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:3000'
    private loginUrl = 'api/users'

    constructor(private httpClient: HttpClient) {}

    login(login: string, password: string) {
        return this.httpClient.post(`${this.baseUrl}/${this.loginUrl}`, {
            email: login,
            password: password,
        })
    }
}
