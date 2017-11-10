import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BankInfoService } from '../services/bankInfoService';

@Pipe({name: 'waivCurrency'})
export class WaivCurrencyPipe implements PipeTransform {

    currencyCode: string = 'USD';


    constructor(private bankInfoService: BankInfoService, private currencyPipe: CurrencyPipe) {   }

    transform(value: any, symbolDisplay: boolean = true, digits?: string): string {
        return this.currencyPipe.transform(value, this.bankInfoService.getBankInfo().currencyCode, symbolDisplay,digits);
    } 
    
}