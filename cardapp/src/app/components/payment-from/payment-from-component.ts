import { Component, EventEmitter, OnInit, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { HttpObservable, RestClient } from '../../services/rest-client.service';
import { PaymentFromModel } from './payment-from.model';
import { accountLimitValidator } from '../../validators/account-limit.validator';


// reactive form as validation of limit is dynamic - based on the account selected.
// currently calling component will pull back the model.
@Component({
  selector: 'app-payment-from',
  templateUrl: './payment-from.component.html',
  styleUrls: ['./payment-from.component.scss']
})

export class PaymentFromComponent implements OnInit, OnChanges {
    @Input() inputModel: PaymentFromModel;
    @Output() changes = new EventEmitter<any>();

    model: PaymentFromModel;

    bankInfo: any;
    limit: number;
    paymentFromForm: FormGroup;

  constructor(private rest: RestClient, private builder: FormBuilder) {
      console.log('in constructor ', this.inputModel);

  }

  ngOnInit() {
    console.log('in onInit ',this.inputModel);
    this.bankInfo = this.rest.get<any>('/bank');
    this.bankInfo.subscribe();

    // create our own copy of the model
    this.model = this.cloneModel(this.inputModel);

    // create the form
    console.log('creating form');
    this.paymentFromForm = this.builder.group({
        ourDescription: [this.model.ourDescription, [Validators.required]],
        theirDescription: [this.model.theirDescription],
        amount: this.model.amount, buildAmountValidators() {},
        limit: 0,
        saveDescriptionForRecipient: false
      }
    );

    // listen for changes to form fields.
    console.log('create listeners');
    this.paymentFromForm.get('amount').valueChanges.forEach(
      (value: string) => {
        console.log('in amount handler ', value);
        this.model.amount=value;
        this.fireModelChange();
      }
    );
    this.paymentFromForm.get('ourDescription').valueChanges.forEach(
      (value: string) => {
        console.log('in our description handler ', value);
        this.model.ourDescription = value;
        this.fireModelChange();
      }
    );

    this.paymentFromForm.get('theirDescription').valueChanges.forEach(
      (value: string) => {
        console.log('in their description handler ', value);
        this.model.ourDescription = value;
        this.fireModelChange();
      }
    );
    // catch changes to form status, includes validation failures
    this.paymentFromForm.valueChanges.forEach(
      (value: string) => {
        console.log('overall form handler ', value);
        this.fireModelChange();
      }
    );


  }

  cloneModel(m: PaymentFromModel): PaymentFromModel {
    return new PaymentFromModel(
        m.account,
        m.ourDescription,
        m.theirDescription,
        m.amount,
        m.saveDescriptionForRecipient );
  }

  ngOnChanges() {
    console.log('in ngOnChanges');
    if (this.paymentFromForm) {
      this.model = this.cloneModel(this.inputModel);
      this.paymentFromForm.reset({
        ourDescription: this.model.ourDescription,
        theirDescription: this.model.theirDescription,
        amount: this.model.amount,
        saveDescriptionForRecipient: this.model.saveDescriptionForRecipient,
        account: this.model.account
      });
      this.fireModelChange();
    }
  }

  private fireModelChange() {
    console.log('firing model change');
    this.model.modelIsValid = this.paymentFromForm.valid;
    this.changes.emit(this.model);
  }

  onAccountSelected(account) {
    this.model.account = account;
    this.paymentFromForm.reset();

    this.limit = account.limits['XFR_TRX'];
    this.paymentFromForm.patchValue({
      limit: this.limit
    });
    this.updateLimitValidator();

    console.log();

    console.log('account=', account);
  }


  updateLimitValidator() {
    this.paymentFromForm.controls['amount'].setValidators(
      this.buildAmountValidators());
  }

  buildAmountValidators(): ValidatorFn[] {
    return [
      accountLimitValidator(this.model.account.limits['XFR_TRX']),
      Validators.min(.01),
    ];
  }

  get diagnostic() { return JSON.stringify(this); }

  get amount() {
    if (this.paymentFromForm == null) {
      console.log("amount is null");
    } else {
      return this.paymentFromForm.get('amount');
    }
  }

  get ourDescription() {
    if (this.paymentFromForm == null) {
      console.log("our description is null");
    } else {
      return this.paymentFromForm.get('ourDescription');
    }
  }

  get theirDescription() {
    if (this.paymentFromForm == null) {
      console.log("their description is null");
    } else {
      return this.paymentFromForm.get('theirDescription');
    }
  }


}
