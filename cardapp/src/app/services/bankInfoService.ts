import { Injectable } from '@angular/core';
import { RestClient } from './rest-client.service';

import { BankInfo } from '../model/BankInfo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class BankInfoService {
    bankInfo: BankInfo;
    
    constructor(private restClient: RestClient) {
        let x = this.restClient.get("/bank")
            .map(data => this.bankInfo = data)
            .catch(err => {throw err});
        x.subscribe();
    }

    getBankInfo(): BankInfo {
        return this.bankInfo;
    }
}