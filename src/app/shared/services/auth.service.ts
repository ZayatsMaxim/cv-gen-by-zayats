import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { baseUrl, loginUrl, logoutUrl } from '../url-consts'
import { Tokens } from '../models/responses'

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
                    return response as Tokens
                }),
            )
    }

    logout() {
        return this.httpClient.get(`${baseUrl}/${logoutUrl}`)
    }
}
