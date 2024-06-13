import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const signupAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticatedUser()) {
    router.navigate(['/home']);
    return false;
  }

  return !authService.isAuthenticatedUser();
};
