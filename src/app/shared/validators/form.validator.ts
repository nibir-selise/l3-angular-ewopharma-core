import {isArray} from 'lodash';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import moment from 'moment';

export function genericValidator(field: any): ValidatorFn {
  let errors: any;

  const configs = field.validators;

  return (control: AbstractControl): { [key: string]: any } | null => {
    if (field.required === 1 && !control.value) {
      return {genericValidator: {value: 'Field can not be empty....'}};
    }

    if (Array.isArray(configs)) {
      configs && configs.forEach(config => {
        const {ValidationType, ValidationMessage, ValidationValue, ValidationStringifyValue} = config;

        // Not Empty
        if (ValidationType === 1) {
          if (!control.value) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // String Length
        if (ValidationType === 2) {
          if (config.Operation === 'lte' || config.operation === '<=') {
            if ((control.value as string).length > ValidationValue) {
              errors = {genericValidator: {value: ValidationMessage}};
            } else {
              errors = null;
            }
          }
        }

        if (ValidationType === 3 && config.Operation === 'between' && control.value) {
          if ((control.value as string).length < ValidationValue.MinValue || (control.value as string).length > ValidationValue.MaxValue) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        if (ValidationType === 4 && config.Operation === 'match' && control.value) {
          if (!RegExp(ValidationStringifyValue).test(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        if (ValidationType === 5 && config.Operation === 'format' && control.value) {
          if (!(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/).test(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        if (ValidationType === 6 && control.value) {
          if (new Date(control.value) > new Date(ValidationValue)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        if (ValidationType === 7 && control.value) {
          const {MinValue, MaxValue} = config.ValidationValue;

          if (new Date(control.value) < new Date(MinValue) && new Date(control.value) > new Date(MaxValue)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Date Range
        if (ValidationType === 8) {
          // Will implement later
        }

        // Birth date must be less than today's date
        if (ValidationType === 9) {
          if (new Date(control.value) >= new Date) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Gender
        if (ValidationType === 10) {
          if (!ValidationValue.includes(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Value must be boolean
        if (ValidationType === 12) {
          if (typeof control.value !== 'boolean') {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Value must be number
        if (ValidationType === 13) {
          // tslint:disable-next-line:radix
          if (!parseInt(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Value must be integer
        if (ValidationType === 14) {
          if (Number.isInteger(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Number Range
        if (ValidationType === 15 || ValidationType === 16) {
          // No range provided in seed data
        }

        // Number Between
        if (ValidationType === 17 || ValidationType === 18) {
          if (control.value < ValidationValue.MinValue || control.value > ValidationValue.MaxValue) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Number Limit
        if (ValidationType === 19 || ValidationType === 20) {
          if (control.value > ValidationValue) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Time format
        if (ValidationType === 23) {
          if (!(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/).test(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Time Limit
        if (ValidationType === 24) {
          if (control.value > ValidationValue) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Time Between
        // Check the give time format
        if (ValidationType === 25) {
          if (control.value < ValidationValue.MinValue || control.value > ValidationValue.MaxValue) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }

        // Time Range
        if (ValidationType === 26) {
          // Range not given
        }

        // Is GUID
        if (ValidationType === 27) {
          if (!(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(control.value)) {
            errors = {genericValidator: {value: ValidationMessage}};
          } else {
            errors = null;
          }
        }
      });
    } else {
      const config = configs;
      const ValidationType = config.ValidationType;
      const ValidationMessage = config.ValidationMessage;
      const ValidationStringifyValue = config.ValidationStringifyValue;

      // const {ValidationType, ValidationMessage, ValidationValue} = config;

      // Not Empty
      if (ValidationType === 1) {
        if (!control.value) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // String Length
      if (ValidationType === 2) {
        if ((control.value as string).length > ValidationStringifyValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      if (ValidationType === 3 && config.Operation === 'between' && control.value) {
        if ((control.value as string).length < ValidationStringifyValue.MinValue || (control.value as string).length > ValidationStringifyValue.MaxValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Pattern match
      if (ValidationType === 4) {
        if (!RegExp(ValidationStringifyValue).test(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Date Format
      if (ValidationType === 5 && config.Operation === 'format' && control.value) {
        if (!moment(control.value).isValid()) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Date Limit
      if (ValidationType === 6 && control.value) {
        if (new Date(control.value) > new Date(ValidationStringifyValue)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Date Between
      if (ValidationType === 7 && control.value) {
        const {MinValue, MaxValue} = config.ValidationValue;

        if (new Date(control.value) < new Date(MinValue) && new Date(control.value) > new Date(MaxValue)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Date Range
      if (ValidationType === 8) {
        // Will implement later
      }

      // Birth date must be less than today's date
      if (ValidationType === 9) {
        if (moment(control.value).startOf('date') >= moment().startOf('day')) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Gender
      if (ValidationType === 10) {
        if (!JSON.parse(ValidationStringifyValue).includes(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Value must be boolean
      if (ValidationType === 12 && control.value) {
        if (typeof JSON.parse(control.value) !== 'boolean') {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Value must be number
      if (ValidationType === 13) {
        if (isNaN(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Value must be integer
      if (ValidationType === 14) {
        if (Number.isInteger(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Number Range
      if (ValidationType === 15 || ValidationType === 16) {
        // No range provided in seed data
      }

      // Number Between
      if (ValidationType === 17 || ValidationType === 18) {
        if (control.value < ValidationStringifyValue.MinValue || control.value > ValidationStringifyValue.MaxValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Number Limit
      if (ValidationType === 19 || ValidationType === 20) {
        if (control.value > ValidationStringifyValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Time format
      if (ValidationType === 23) {
        if (!(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/).test(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Time Limit
      if (ValidationType === 24) {
        if (control.value > ValidationStringifyValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Time Between
      // Check the give time format
      if (ValidationType === 25) {
        if (control.value < ValidationStringifyValue.MinValue || control.value > ValidationStringifyValue.MaxValue) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }

      // Time Range
      if (ValidationType === 26) {
        // Range not given
      }

      // Is GUID
      if (ValidationType === 27) {
        if (!(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(control.value)) {
          errors = {genericValidator: {value: ValidationMessage}};
        } else {
          errors = null;
        }
      }
    }


    return errors;
  };
}
