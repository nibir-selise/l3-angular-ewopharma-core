import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
        const password = control.get('Password').value;
        const confirmPassword = control.get('ConfirmPassword').value;

        if (password !== confirmPassword) {
            control.get('ConfirmPassword').setErrors( {passwordNotMatched: true} );
        } else {
            return null;
        }
    }
}
