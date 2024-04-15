import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import {
    HttpClient,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { httpRequestsInterceptor } from './shared/http-requests.interceptor'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([httpRequestsInterceptor])),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ),
        provideAnimationsAsync(),
    ],
}
