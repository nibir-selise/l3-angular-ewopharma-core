import {AbstractControl, ValidationErrors} from '@angular/forms';

export class AutoCompleteValidator {
  static notSelectedFromOptions(control: AbstractControl) {
    if (typeof control.value !== 'object') {
      return { notSelectedFromOptions: true };
    }
    return null;
  }
}
