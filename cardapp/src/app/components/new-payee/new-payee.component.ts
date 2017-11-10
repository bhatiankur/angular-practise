import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewToAccountModel} from "./new-payee.model";
import {ValidatePhoneNumber} from "../../validators/phone-number.validator";
import {RestClient} from "../../services/rest-client.service";
import {BankInfo} from "../../model/BankInfo";
import {BankInfoService} from "../../services/bankInfoService";

@Component({
  selector: 'new-payee',
  templateUrl: './new-payee.component.html',
  styleUrls: ['./new-payee.component.scss']
})
export class NewPayeeComponent {

  newPayee: NewToAccountModel;

  @Output() changes : any;

  isAddNewAccountFormVisible : boolean;

  newAccountFormGroup : FormGroup;
  newAccountFormGroupMobile : FormGroup;
  newAccountFormGroupEmailAddress : FormGroup;

  accountNumber : AbstractControl;
  BSB : AbstractControl;
  accountName : AbstractControl;
  save : AbstractControl;


  emailAddress : AbstractControl;
  mobileNumber : AbstractControl;

  selectedDestinationType : string = 'BankAccount';

  buttonLabel : string = "New Account";

  constructor(private bankInfoService: BankInfoService, private fb : FormBuilder){
    this.changes = new EventEmitter();
    this.newPayee = new NewToAccountModel('','','',false,'','','',false);
  }

  ngOnInit() {

    this.newAccountFormGroup = this.fb.group({
      'accountNumber' : ['', Validators.required],
      'BSB' : ['', Validators.required],
      'accountName' : ['', Validators.required],
      'save' : false
    });

    this.newAccountFormGroupMobile = this.fb.group({
      'mobileNumber' : ['', [Validators.required,ValidatePhoneNumber( this.bankInfoService.getBankInfo().countryCode)]]
    });

    this.newAccountFormGroupEmailAddress = this.fb.group({
      'emailAddress' : ['', [Validators.required,Validators.email]]
    });

    this.accountNumber = this.newAccountFormGroup.controls['accountNumber'];
    this.BSB = this.newAccountFormGroup.controls['BSB'];
    this.accountName = this.newAccountFormGroup.controls['accountName'];
    this.save = this.newAccountFormGroup.controls['save'];

    this.mobileNumber = this.newAccountFormGroupMobile.controls['mobileNumber'];

    this.emailAddress = this.newAccountFormGroupEmailAddress.controls['emailAddress'];

    // listen for changes to form fields.
    console.log('create listeners');
    this.accountNumber.valueChanges.forEach(
      (value: string) => {
        console.log('in amount handler ', value);
        this.newPayee.accountNumber = value;
        this.fireModelChange();
      }
    );
    this.BSB.valueChanges.forEach(
      (value: string) => {
        console.log('in bsb handler ', value);
        this.newPayee.BSB = value;
        this.fireModelChange();
      }
    );
    this.accountName.valueChanges.forEach(
      (value: string) => {
        console.log('in accountName handler ', value);
        this.newPayee.accountName = value;
        this.fireModelChange();
      }
    );
    this.save.valueChanges.forEach(
      (value: boolean) => {
        console.log('in save handler ', value);
        this.newPayee.toBeSaved = value;
        this.fireModelChange();
      }
    );
    this.newAccountFormGroup.valueChanges.forEach(
      (value: string) => {
        console.log('in form handler ', value);
        this.fireModelChange();
      }
    );


    this.mobileNumber.valueChanges.forEach(
      (value: string) => {
        console.log('in mobile number handler ', value);
        this.newPayee.mobileNumber = value;
        this.fireModelChange();
      }
    );
    this.newAccountFormGroupMobile.valueChanges.forEach(
      (value: string) => {
        console.log('in form handler ', value);
        this.fireModelChange();
      }
    );

    this.emailAddress.valueChanges.forEach(
      (value: string) => {
        console.log('in email handler ', value);
        this.newPayee.emailAddress = value;
        this.fireModelChange();
      }
    );
    this.newAccountFormGroupEmailAddress.valueChanges.forEach(
      (value: string) => {
        console.log('in form handler ', value);
        this.fireModelChange();
      }
    );


  }

  public showAddNewAccountPanel() {
    console.log('toggle the add_new_payee_panel');
    if(this.isAddNewAccountFormVisible) {
      this.isAddNewAccountFormVisible = false;
      this.buttonLabel = "New Account";

      this.newPayee.valid = false;
      this.changes.emit(this.newPayee);
    }
    else{
      this.isAddNewAccountFormVisible = true;
      this.buttonLabel = "Cancel";
    }
  }

  private fireModelChange() {
    console.log('firing model change');
    if(this.selectedDestinationType == 'BankAccount') {
      this.newPayee.valid = this.newAccountFormGroup.valid;
      this.newPayee.destinationType = 'BankAccount';
    }else if (this.selectedDestinationType == 'Mobile') {
      this.newPayee.valid = this.newAccountFormGroupMobile.valid;
      this.newPayee.destinationType = 'Mobile';
    } else {
      this.newPayee.valid = this.newAccountFormGroupEmailAddress.valid;
      this.newPayee.destinationType = 'EmailAddress';
    }
    this.changes.emit(this.newPayee);
  }

  private mobileTypeSelected() {
    console.log('destination type selected - mobile');
    this.selectedDestinationType = 'Mobile';
    this.fireModelChange();
  }
  private emailaddressTypeSelected() {
    console.log('destination type selected - email address');
    this.selectedDestinationType = 'EmailAddress';
    this.fireModelChange();
  }
  private bankaccountTypeSelected() {
    console.log('destination type selected - bank account');
    this.selectedDestinationType = 'BankAccount';
    this.fireModelChange();
  }

}

