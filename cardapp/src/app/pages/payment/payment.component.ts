import { Component, OnInit } from '@angular/core';
import { PaymentFromModel } from '../../components/payment-from/payment-from.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NewToAccountModel} from '../../components/new-payee/new-payee.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public account: string;
  toAccount: string;

  amount: string;
  description: string;

  paymentForm: FormGroup;

  paymentWhenGroup: FormGroup;

  // The models to be used by this form - these models are provided by the constituents of this containing component
  initialFromAccountModel: PaymentFromModel = new PaymentFromModel(null, '', '', '', false);
  fromAccountModel: PaymentFromModel = this.initialFromAccountModel;


  newAccount: NewToAccountModel = new NewToAccountModel('','','',false,'','','',false);

  submitted: boolean = false;

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    console.log('creating form');

    this.paymentForm = this.builder.group({
      }
    );
    this.paymentWhenGroup = this.builder.group({
      when: '',
      later: this.builder.group({date: ''}),
      ongoing: this.builder.group({frequency: '', start: '', end: '', payments: '', date: ''})
    });
  }


  accountSelected(account) {
    this.toAccount = account;

  }


  onSubmit(e) {
    console.log('receiving submitted model=', e);
    console.log('model was ', JSON.stringify(this.fromAccountModel));
    this.submitted = true;
  }

  onPaymentFromChange(m: PaymentFromModel) {
    console.log('onChange ', m);
    this.fromAccountModel = m;
  }

  onNewAccountChange(m: NewToAccountModel) {
    console.log('onChange ', m);
    this.newAccount = m;
  }


}
