import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {


  private currRow:number = -1;

  @Input() transactionList;

  constructor() { }

  ngOnInit() {
  }


}
