import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { CustomValidator } from '../../../../core/custom-validator';
import {
  Observable,
  Subject,
  Subscription,
  concatMap,
  finalize,
  takeUntil,
} from 'rxjs';
import { IUser, User } from '../../../../shared/interfaces/user.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup;
  fullName: string = '';
  isSubmitted = false;
  private destroy$: Subject<void> = new Subject<void>();
  private firstNameSubscription: Subscription | undefined;
  private lastNameSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private ns: NotificationService,
    private cv: CustomValidator,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, this.cv.emailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.cv.passwordValidator,
        ],
      ],
    });

    this.firstNameSubscription = this.firstName?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFullName();
      });

    this.lastNameSubscription = this.lastName?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFullName();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.firstNameSubscription) {
      this.firstNameSubscription.unsubscribe();
    }
    if (this.lastNameSubscription) {
      this.lastNameSubscription.unsubscribe();
    }
  }

  updateFullName(): void {
    const firstName = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    this.fullName = `${firstName} ${lastName}`;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const lastNameLength = formValues.lastName.length;
      const requestBody: User = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };
      this.isSubmitted = true;
      this.signupService
        .getThumbnailUrl(lastNameLength)
        .pipe(
          concatMap((thumbnailUrl: string): Observable<IUser> => {
            requestBody['thumbnailUrl'] = thumbnailUrl;
            return this.signupService.submitUser(requestBody);
          }),
          takeUntil(this.destroy$),
          finalize(() => {
            this.isSubmitted = false;
          })
        )
        .subscribe({
          next: (user: IUser) => {
            this.ns.success('Successfully signed up!');
            this.authService.signInUser(user);
            this.router.navigate(['/home']);
          },
          error: (error: HttpErrorResponse) => {
            console.log('error', error);
            this.ns.error('Signup failed. Please try again.');
          },
        });
    }
  }

  onReset(): void {
    this.signupForm.reset();
  }

  get firstName(): AbstractControl | null {
    return this.signupForm?.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signupForm?.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.signupForm?.get('email');
  }

  get password(): AbstractControl | null {
    return this.signupForm?.get('password');
  }

  get validForm(): boolean | undefined {
    return (
      this.firstName?.valid &&
      this.lastName?.valid &&
      this.email?.valid &&
      this.password?.valid
    );
  }
}
