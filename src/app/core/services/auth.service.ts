import { Injectable } from '@angular/core';
import { IUser } from '../../shared/interfaces/user.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new Subject<IUser | null>();

  constructor() {
    this.isAuthenticated = !!localStorage.getItem('user');
  }
  // this service is just faking the sign in of user.
  // If the user is not signed in, user will be null other while registering
  // User will be added when registration api return successful response
  private user: IUser | null = JSON.parse(
    localStorage.getItem('user') || 'null'
  );
  private isAuthenticated = false;

  signInUser(user: IUser): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.isAuthenticated = true;
    this.user$.next(user);
  }

  getUser(): IUser | null {
    if (this.user) {
      return {
        ...this.user,
      };
    }

    return null;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.user$.next(null);
  }

  setUser(user: IUser | null): void {
    this.user = user;
  }
}
