import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewAccount} from "./new-account.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newAccount: NewAccount = new NewAccount();

  @Output() changes : any;

  isAddNewAccountFormVisible : boolean;

  newAccountFormGroup : FormGroup;
  accountNumber : AbstractControl;
  BSB : AbstractControl;
  accountName : AbstractControl;
  save : AbstractControl;

  buttonLabel : string = "New Account";

  constructor(fb : FormBuilder){

    this.changes = new EventEmitter();

    this.newAccountFormGroup = fb.group({
      'accountNumber' : ['', Validators.required],
      'BSB' : ['', Validators.required],
      'accountName' : ['', Validators.required],
      'save' : false
    });

    this.accountNumber = this.newAccountFormGroup.controls['accountNumber'];
    this.BSB = this.newAccountFormGroup.controls['BSB'];
    this.accountName = this.newAccountFormGroup.controls['accountName'];
    this.save = this.newAccountFormGroup.controls['save'];

    // listen for changes to form fields.
    console.log('create listeners');
    this.accountNumber.valueChanges.forEach(
      (value: string) => {
        console.log('in account number handler ', value);
        this.newAccount.accountNumber = value;
        this.fireModelChange();
      }
    );
    this.BSB.valueChanges.forEach(
      (value: string) => {
        console.log('in BSB handler ', value);
        this.newAccount.BSB = value;
        this.fireModelChange();
      }
    );
    this.accountName.valueChanges.forEach(
      (value: string) => {
        console.log('in account name handler ', value);
        this.newAccount.accountName = value;
        this.fireModelChange();
      }
    );
    this.save.valueChanges.forEach(
      (value: boolean) => {
        console.log('in toSave handler ', value);
        this.newAccount.toBeSaved = value;
        this.fireModelChange();
      }
    );

  }

  public showAddNewAccountPanel() {
    console.log('toggle the add_new_payee_panel');
    if(this.isAddNewAccountFormVisible) {
      this.isAddNewAccountFormVisible = false;
      this.buttonLabel = "New Account";
    }
    else{
      this.isAddNewAccountFormVisible = true;
      this.buttonLabel = "Cancel";
    }
  }

  private fireModelChange() {
    console.log('Hellow ' + this.newAccountFormGroup.value);
    this.newAccount.valid = this.newAccountFormGroup.valid;
    this.changes.emit(this.newAccount);
  }

}
