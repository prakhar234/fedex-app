import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../../../app.routes';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { Subject } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let el: DebugElement;
  let service: AuthService;
  let user$: Subject<IUser | null>;
  const fakeUser: IUser = {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
  };

  beforeEach(async () => {
    user$ = new Subject<IUser | null>();
    const mockAuthServiceStub = {
      user$: user$.asObservable(),
      signInUser: jasmine.createSpy('signInUser').and.callFake(() => {
        user$.next(fakeUser);
      }),
      logout: jasmine.createSpy('logout').and.callFake(() => {
        user$.next(null);
      }),
    };
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuthServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one navigation item', () => {
    const navItems = el.queryAll(By.css('.navigation-link'));
    expect(navItems.length).toBeGreaterThan(0);
    expect(navItems.length).toBe(1);
  });

  it('should have signup as the first nav item', () => {
    const navItems = el.queryAll(By.css('.navigation-link'));
    expect(navItems[0].nativeElement.textContent).toBe('Signup');
  });

  it('should have authenticated state when user is signed in', () => {
    service.signInUser(fakeUser);
    fixture.detectChanges();
    const navItems = el.queryAll(By.css('.navigation-link'));
    expect(navItems.length).toBe(2);
    expect(navItems[0].nativeElement.textContent).toBe('Home');
    expect(navItems[1].nativeElement.textContent).toBe('Logout');
  });

  it('should remove authenticated state when clicked on Logout navigation item', () => {
    service.signInUser(fakeUser);
    fixture.detectChanges();
    let navItems = el.queryAll(By.css('.navigation-link'));
    const anchorElem = navItems[1].queryAll(By.css('.link'));
    anchorElem[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(service.logout).toHaveBeenCalled();
    navItems = el.queryAll(By.css('.navigation-link'));
    expect(navItems.length).toBe(1);
  });
});
