import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newAccount: any;

  isAddNewAccountFormVisible : boolean;

  newAccountFormGroup : FormGroup;
  accountNumber : AbstractControl;
  BSB : AbstractControl;
  accountName : AbstractControl;
  save : AbstractControl;

  buttonLabel : string = "New Account";

  constructor(fb : FormBuilder){
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

  onSubmit(value: string): void {
    console.log('submitted model: ', value);
    this.newAccount = value;
  }
}
