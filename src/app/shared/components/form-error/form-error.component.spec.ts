import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormErrorComponent } from './form-error.component';
import { FormControl, Validators } from '@angular/forms';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array if formInput is undefined', () => {
    component.formInput = undefined;
    expect(component.errorMessages).toEqual([]);
  });

  it('should return an empty array if formInput is null', () => {
    component.formInput = null;
    expect(component.errorMessages).toEqual([]);
  });

  it('should return an empty array if formInput is not touched', () => {
    component.formInput = new FormControl('', Validators.required);
    expect(component.errorMessages).toEqual([]);
  });

  it('should return appropriate error messages based on error keys', () => {
    component.name = 'Email';
    component.formInput = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (control) =>
        control.value && !/\S+@\S+\.\S+/.test(control.value)
          ? { invalidEmail: true }
          : null,
      (control) =>
        control.value && !/[A-Z]/.test(control.value)
          ? { noUpperCase: true }
          : null,
      (control) =>
        control.value && !/[a-z]/.test(control.value)
          ? { noLower: true }
          : null,
      (control) =>
        control.value && /Prakhar/i.test(control.value)
          ? { containsName: true }
          : null,
    ]);
    component.formInput.markAsTouched();

    let expectedMessages = [
      'Email is too short!',
      'Please enter a valid email!',
      'Email contains no upper case characters!',
    ];

    component.formInput.setValue('n');
    expect(component.errorMessages).toEqual(expectedMessages);
    component.formInput.setValue('N');
    expectedMessages = [
      'Email is too short!',
      'Please enter a valid email!',
      'Email contains no lower case characters!',
    ];
    expect(component.errorMessages).toEqual(expectedMessages);
    component.formInput.setValue('Prakhar');
    expectedMessages = [
      'Please enter a valid email!',
      'Email contains first or last name!',
    ];
    expect(component.errorMessages).toEqual(expectedMessages);
    component.formInput.setValue('Nn@nn.nn');
    expectedMessages = [];
    expect(component.errorMessages).toEqual(expectedMessages);
  });

  it('should handle unknown error keys gracefully', () => {
    component.name = 'Field';
    component.formInput = new FormControl('', () => ({ unknownError: true }));
    component.formInput.markAsTouched();

    const expectedMessages = ['Field is a required field!'];
    expect(component.errorMessages).toEqual(expectedMessages);
  });

  it('should not duplicate error messages if error keys are repeated', () => {
    component.name = 'Password';
    component.formInput = new FormControl('', [Validators.required]);
    component.formInput.markAsTouched();
    component.formInput.setErrors({ required: true, minlength: true });

    const expectedMessages = [
      'Password is a required field!',
      'Password is too short!',
    ];
    expect(component.errorMessages).toEqual(expectedMessages);
  });
});
