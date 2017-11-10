import { AbstractControl, ValidatorFn } from '@angular/forms';

export function accountLimitValidator(transactionLimit: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      console.log('in validator check ',control.value,' against limit of ',transactionLimit);
      const numVal = control.value as number;
      const overLimit = numVal > transactionLimit;
      return overLimit ? {'accountLimit': {value: control.value}} : null;
    }
}

