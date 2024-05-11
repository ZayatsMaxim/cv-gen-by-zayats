import { inject } from '@angular/core';
import type { CanActivateChildFn } from '@angular/router';
import { UserTokenStorageService } from '../services/user-token-storage.service';
import { TokenHelperService } from '../services/token-helper.service';

export const authGuard: CanActivateChildFn = () => {
  const token = inject(UserTokenStorageService).getAccessToken();
  return token ? !inject(TokenHelperService).isTokenExpired(token) : false;
};
