import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { IUser } from '../../shared/interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  const fakeUser: IUser = {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in user when sign in user is called', () => {
    service.signInUser(fakeUser);
    const user = service.getUser();
    expect(user?.id).toBeTruthy();
    expect(user?.id).toBe(fakeUser.id);
  });

  it('should return authenticated as true if the user is signed in', () => {
    service.signInUser(fakeUser);
    const isAuthenticated = service.isAuthenticatedUser();
    expect(isAuthenticated).toBeTruthy();
  });

  it('should return authenticated as false if the user is signed out', () => {
    service.logout();
    const isAuthenticated = service.isAuthenticatedUser();
    expect(isAuthenticated).toBeFalsy();
  });

  it('should emit user when signin user is called', (done: DoneFn) => {
    service.user$.subscribe({
      next: (user) => {
        expect(user?.id).toBe(fakeUser.id);
        done();
      }
    });
    service.signInUser(fakeUser);

  });

  it('should return null if user is not signed in', () => {
    service.logout();
    const user = service.getUser();
    expect(user).toBe(null);
  })

  it('should set the user to passed user', () => {
    service.setUser(fakeUser);
    const user = service.getUser();
    expect(user?.id).toBe(fakeUser.id);
  })
});
