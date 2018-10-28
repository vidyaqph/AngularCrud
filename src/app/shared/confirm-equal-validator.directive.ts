import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmEqualValidatorDirective,
      multi: true
    }
  ]
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input()
  appConfirmEqualValidator: string; // Not used
  // This is used when firing the validation on individual control
  // validate(control: AbstractControl): { [key: string]: any } | null {
  //   // Specify return type as a key value pair  or (|) null
  //   const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
  //   if (controlToCompare && controlToCompare.value !== control.value) {
  //     return { notEqual: true };
  //   }
  //   return null;
  // }
  // this is used when validation is fired on ngModelGroup
  validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
    // Specify return type as a key value pair  or (|) null
    const passwordField = passwordGroup.get('password');
    const confirmPasswordField = passwordGroup.get('confirmPassword');
    if (passwordField && confirmPasswordField  && confirmPasswordField.value !== passwordField.value) {
      return { notEqual: true };
    }
    return null;
  }
}
