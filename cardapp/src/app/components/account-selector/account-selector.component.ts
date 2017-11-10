import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HttpObservable, RestClient } from '../../services/rest-client.service';
import { AppComponent } from '../../app.component';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnInit {
  accountsHttp: HttpObservable<any[]>;
  
  accounts: any;
  loaded: boolean = false;


  selectedAccount: any;
  @Output() selected = new EventEmitter<any>();
  @Input() showBalance: boolean = false;
  @Input() textSize: number = 1;
  
  bankInfo: any;
  currencyCode: string;

  constructor(private rest: RestClient) { }

  ngOnInit() {
    this.bankInfo = this.rest.get<any>('/bank');
    this.bankInfo.subscribe(bank => {
      this.currencyCode = this.bankInfo.result.currencyCode;
      console.log('in account selector component subscribe, currency=', this.currencyCode);
    });

      console.log('in account selector component, currency=', this.currencyCode);
      

    this.accountsHttp = this.rest.get<any[]>('/account/accountsAndLimits');
    this.accountsHttp
      .subscribe(data => {
        this.accounts = data.map(x => {
          let y = {...x.account, limits: x.limits};
          return y;});
          this.loaded = true;
        console.log('loadedAccounts=', this.accounts);
        
        this.onSelect(this.accounts[0].accountNumber);
      }
      );

    // this.accounts = this.rest.get<any[]>('/account');
    // this.accounts.subscribe(accounts => {
    //   this.onSelect(accounts[0].accountNumber);
    // });
  }

  onSelect(selectedAccountNumber) {
    console.log('selected account number is',selectedAccountNumber);
    console.log('accounts=',this.accountsHttp);
    console.log('loaded accounts=',this.accounts);
    
    this.selectedAccount = this.accounts.find(it => it.accountNumber === selectedAccountNumber);
    // this.selectedAccount = this.accounts.result.find(it => it.accountNumber === selectedAccountNumber);
    console.log('selected account=',this.selectedAccount);
    this.selected.emit(this.selectedAccount);
  }

  getTextSize() {
    return this.textSize;
  }

  getCurrency() {
    return this.bankInfo.currencyCode;
  }

  get diagnostic() { return JSON.stringify(this.accounts); }

}
