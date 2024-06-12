import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';

export class MockAuthService {

  isAuthenticatedUser(): boolean {
    return false;
  }
}

describe('authGuard', () => {
  let authService: MockAuthService;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{provide: AuthService, useClass: MockAuthService}]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should not allow access when the user is logged out', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
    // Act
    const result = await TestBed.runInInjectionContext(() => authGuard(route, state));

    // Assert
    expect(result).toBe(false);

  });

  it('should allow access when the user is logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
  
    spyOn(authService, 'isAuthenticatedUser').and.returnValue(true);
    // Act
    const result = await TestBed.runInInjectionContext(() => authGuard(route, state));

    // Assert
    expect(result).toBe(true);

  });
});
