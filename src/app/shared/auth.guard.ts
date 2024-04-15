import { inject } from '@angular/core'
import type { CanActivateChildFn } from '@angular/router'
import { UserTokenStorageService } from './services/user-token-storage.service'

export const authGuard: CanActivateChildFn = () => {
    return inject(UserTokenStorageService).getAccessToken() ? true : false
}
