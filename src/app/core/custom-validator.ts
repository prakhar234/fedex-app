import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CustomValidator {
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const formGroup = control.parent;
    if (!formGroup) {
      return null;
    }

    const firstName = formGroup.get('firstName')?.value;
    const lastName = formGroup.get('lastName')?.value;
    const password = control.value;

    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const doesNotContainName =
      !password.includes(firstName) && !password.includes(lastName);

    if (!hasUpperCase) {
      return {
        noUpperCase: true,
      };
    }

    if (!hasLowerCase) {
      return {
        noLowerCase: true,
      };
    }

    if (!doesNotContainName) {
      return {
        containsName: true,
      };
    }

    return null;
  }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      return null;
    }

    return { invalidEmail: true };
  }
}
