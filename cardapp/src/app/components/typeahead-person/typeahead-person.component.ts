import {Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { PersonDataViewService } from './person-data-view.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentToModel} from "./payment-to.model";

@Component({
  selector: 'person-typeahead',
  templateUrl: './typeahead-person.component.html',
  styleUrls: ['./typeahead-person.component.css']
})
export class TypeaheadPersonComponent implements OnInit {

  toAccount: PaymentToModel;
  @Output() person: EventEmitter<any>;

  @Input() persons: Array<any>;
  @Input() personsAttrs: Array<any>;

  personList: Array<any>;
  public model: any;
  public matches: Array<any>;

  isAddNewAccountFormVisible : boolean;

  toAccountFormGroup : FormGroup;
  accountNumber : AbstractControl;
  BSB : AbstractControl;
  accountName : AbstractControl;
  save : AbstractControl;

  buttonLabel : string = "New Account";

  constructor(fb : FormBuilder) {
    this.person = new EventEmitter();

    this.toAccountFormGroup = fb.group({
      'accountNumber' : ['', Validators.required],
      'BSB' : ['', Validators.required],
      'accountName' : ['', Validators.required],
      'save' : false
    });

    this.accountNumber = this.toAccountFormGroup.controls['accountNumber'];
    this.BSB = this.toAccountFormGroup.controls['BSB'];
    this.accountName = this.toAccountFormGroup.controls['accountName'];
    this.save = this.toAccountFormGroup.controls['save'];
  }

  ngOnInit() {
    this.personList = (new PersonDataViewService(this.persons, this.personsAttrs)).getPersonList();
    console.log('The list to search on...');
    console.log(this.personList);
    this.matches = this.personList;
  }

  triggerfilter(event) {
    console.log('Input text changes..' + this.model);
    if(this.model === ''){
      this.matches = this.personList;

      this.toAccount.valid = false;
      this.person.emit(this.toAccount);
    }else{
      this.matches = this.personList.filter(e => e.name.toLowerCase().indexOf(this.model) > -1);
    }
    console.log(this.matches.length + ' matches shown..');
  }

  personSelected(item) {
    console.log('Recieved person in typeahead component.. ' + item.name);
    this.model = item.name;
    this.toAccount = new PaymentToModel(item);
    this.toAccount.valid = true;
    this.person.emit(this.toAccount);
  }

  personDeleted(item) {
    console.log('Recieved deleted person in typeahead component.. ' + item);
    let index = this.personList.indexOf(item);
    this.personList.splice(index, 1);
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
    console.log('submitted value: ', value);
  }

}
