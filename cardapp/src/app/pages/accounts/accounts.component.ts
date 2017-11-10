import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpObservable, RestClient } from '../../services/rest-client.service';
import { RouterState } from '@angular/router';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  readonly RESULT_PAGE_SIZE = 5;

  form: FormGroup;

  numPagesLoaded: number;
  account: any;
  searchTransactions: HttpObservable<any>;
  totalResultCount: number;
  transactions: any[];

  showAdvancedSearch = false;

  constructor(private rest: RestClient, private fb: FormBuilder, public auth: AuthService) {
    this.form = this.fb.group({
      dateFrom: '', dateTo: '', type: 'all', amountFrom: ['', Validators.minLength(3)], amountTo: ''
    });
  }

  ngOnInit() {
  }

  onAccountSelected(account) {
    this.account = account;
    this.search(0);
  }

  onSearch() {
    this.search(0);
  }

  onLoadMore() {
    this.search(this.numPagesLoaded);
  }

  search(pageNumber) {
    if (pageNumber === 0) { // reset results
      this.numPagesLoaded = 0;
      this.transactions = [];
    }

    const params = {
      'startDate': this.form.value.dateFrom,
      'endDate': this.form.value.dateTo,
      'startAmount': this.form.value.amountFrom,
      'endAmount': this.form.value.amountTo,
      'status': this.form.value.type,
      'offset': pageNumber * this.RESULT_PAGE_SIZE,
      'max': this.RESULT_PAGE_SIZE
    };
    const transactions = this.transactions;
    this.searchTransactions = this.rest.get(`/account/${this.account.accountNumber}/transactions`, params);
    this.searchTransactions.subscribe(response => {
      this.numPagesLoaded += 1;
      this.transactions = transactions.concat(response.list);
      this.totalResultCount = response.totalCount;
    }, () => {});
  }

  hasMoreToLoad() {
    return this.numPagesLoaded * this.RESULT_PAGE_SIZE < this.totalResultCount;
  }

}
