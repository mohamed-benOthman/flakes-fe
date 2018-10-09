import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static matchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const confirmPassword = abstractControl.get('confirmPassword').value;

    if (!confirmPassword) {
      console.log('confirmPassword is undefined');
      abstractControl.get('confirmPassword').setErrors({MatchPassword: false, ConfirmPasswordUndefined: true});
    }
    else if (password !== confirmPassword) {
      console.log('false');
      abstractControl.get('confirmPassword').setErrors({MatchPassword: true, ConfirmPasswordUndefined: false});
    }
    else {
      abstractControl.get('confirmPassword').setErrors({MatchPassword: false, ConfirmPasswordUndefined: false});
      return null;
    }
  }
}
