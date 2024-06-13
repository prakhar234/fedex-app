import { Injectable } from '@angular/core';
import { IUser } from '../../shared/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // this service is just faking the sign in of user.
  // If the user is not signed in, user will be null other while registering
  // User will be added when registration api return successful response
  private user: IUser | null = JSON.parse(
    localStorage.getItem('user') || 'null'
  );

  user$ = new BehaviorSubject<IUser | null>(this.user);

  signInUser(user: IUser): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
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
    return this.user ? true : false;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.user$.next(null);
  }

  setUser(user: IUser | null): void {
    this.user = user;
  }
}
