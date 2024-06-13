import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  @Input() formInput: AbstractControl | undefined | null;
  @Input() name: string = '';

  get errorMessages(): string[] {
    if (!this.formInput || !this.formInput.touched) {
      return [];
    }

    if (this.formInput?.errors && this.formInput.touched) {
      return Object.keys(this.formInput?.errors).map((key) => {
        switch (key) {
          case 'invalidEmail':
            return 'Please enter a valid email!';
          case 'required':
            return `${this.name} is a required field!`;
          case 'minlength':
            return `${this.name} is too short!`;
          case 'noUpperCase':
            return `${this.name} contains no upper case characters!`;
          case 'noLower':
            return `${this.name} contains no lower case characters!`;
          case 'containsName':
            return `${this.name} contains first or last name!`;
          default:
            return `${this.name} is a required field!`;
        }
      });
    }
    return [];
  }
}
