import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { CustomValidator } from '../../../../core/custom-validator';
import { SignupService } from '../../services/signup.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IUser } from '../../../../shared/interfaces/user.interface';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupService: jasmine.SpyObj<SignupService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const signupServiceSpy = jasmine.createSpyObj('SignupService', [
      'getThumbnailUrl',
      'submitUser',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'success',
      'error',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signInUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [SignupComponent, FormErrorComponent],
      providers: [
        provideHttpClient(),
        ReactiveFormsModule,
        FormBuilder,
        CustomValidator,
        { provide: SignupService, useValue: signupServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    signupService = TestBed.inject(
      SignupService
    ) as jasmine.SpyObj<SignupService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.get('firstName')).toBeDefined();
    expect(component.signupForm.get('lastName')).toBeDefined();
    expect(component.signupForm.get('email')).toBeDefined();
    expect(component.signupForm.get('password')).toBeDefined();
  });

  it('should update fullName when firstName or lastName changes', () => {
    component.signupForm.get('firstName')?.setValue('John');
    component.signupForm.get('lastName')?.setValue('Doe');
    expect(component.fullName).toBe('John Doe');
  });

  it('should reset the form on onReset', () => {
    component.signupForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    component.onReset();

    expect(component.signupForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    });
  });

  describe('onSubmit', () => {
    it('should call signupService and handle success response', fakeAsync(() => {
      const formValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
      };
      const mockUser: IUser = { id: '1', ...formValues } as IUser;
      const thumbnailUrl = 'http://example.com/thumbnail.jpg';

      component.signupForm.setValue(formValues);
      signupService.getThumbnailUrl.and.returnValue(of(thumbnailUrl));
      signupService.submitUser.and.returnValue(of(mockUser));
      expect(component.signupForm.valid).toBe(true);

      component.onSubmit();
      tick();

      expect(signupService.getThumbnailUrl).toHaveBeenCalledWith(
        formValues.lastName.length
      );
      expect(signupService.submitUser).toHaveBeenCalledWith({
        ...formValues,
        thumbnailUrl,
      });
      expect(notificationService.success).toHaveBeenCalledWith(
        'Successfully signed up!'
      );
      expect(authService.signInUser).toHaveBeenCalledWith(mockUser);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    }));

    it('should handle error response from signupService', fakeAsync(() => {
      const formValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
      };
      const errorResponse = new HttpErrorResponse({
        status: 500,
        statusText: 'Server Error',
      });

      component.signupForm.setValue(formValues);
      signupService.getThumbnailUrl.and.returnValue(
        of('http://example.com/thumbnail.jpg')
      );
      signupService.submitUser.and.returnValue(throwError(errorResponse));

      component.onSubmit();
      tick();

      expect(notificationService.error).toHaveBeenCalledWith(
        'Signup failed. Please try again.'
      );
    }));

    it('should not submit the form if form is not valid', fakeAsync(() => {
      const formValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const mockUser: IUser = { id: '1', ...formValues } as IUser;
      const thumbnailUrl = 'http://example.com/thumbnail.jpg';

      component.signupForm.setValue(formValues);
      signupService.getThumbnailUrl.and.returnValue(of(thumbnailUrl));
      signupService.submitUser.and.returnValue(of(mockUser));
      expect(component.signupForm.valid).toBe(false);

      component.onSubmit();
      tick();

      expect(signupService.getThumbnailUrl).not.toHaveBeenCalledWith(
        formValues.lastName.length
      );
      expect(signupService.submitUser).not.toHaveBeenCalledWith({
        ...formValues,
        thumbnailUrl,
      });
      expect(notificationService.success).not.toHaveBeenCalledWith(
        'Successfully sign up!'
      );
      expect(authService.signInUser).not.toHaveBeenCalledWith(mockUser);
      expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
    }));
  });
});
