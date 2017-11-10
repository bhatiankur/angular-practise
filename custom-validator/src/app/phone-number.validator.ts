import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {asYouType, CountryCode, parse} from 'libphonenumber-js';

export function ValidatePhoneNumber(country : string) : ValidatorFn {
  return (control: AbstractControl) : {[key: string]: any} => {
    return Object.getOwnPropertyNames(parse(control.value, { country : country } )).length == 0 ? {'phoneNumberError' : {value: control.value}} : null;
  }
}
