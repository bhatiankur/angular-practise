import { Component, OnInit } from '@angular/core';
import { HttpObservable, RestClient } from '../../services/rest-client.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  customer: HttpObservable<any>;

  constructor(private rest: RestClient) { }

  ngOnInit() {
    this.customer = this.rest.get('/customer/');
  }

}
