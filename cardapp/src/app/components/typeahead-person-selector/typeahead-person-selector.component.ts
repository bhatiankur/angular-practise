import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpObservable, RestClient} from '../../services/rest-client.service';
import {AuthService} from '../../services/auth.service';
import {TypeaheadMatch} from '../../directives/typeahead/typeahead-match.class';

@Component({
  selector: 'typeahead-person-selector',
  templateUrl: './typeahead-person-selector.component.html',
  styleUrls: ['./typeahead-person-selector.component.scss']
})
export class TypeaheadPersonSelectorComponent implements OnInit {


  @Output() accountSelected = new EventEmitter();
  persons: Array<any> = [];
  public selected: string;
  public payees: HttpObservable<any>;
  public contacts: HttpObservable<any>;
  //not fetched from server this the use case around them are more fully formed
  subordinates: HttpObservable<any>;

  constructor(private rest: RestClient, private auth: AuthService) {}

  ngOnInit() {
    this.payees = this.rest.get('/customer/payees');

    this.payees.subscribe(() => {
      console.log('got the payees from server..');
      this.persons = this.persons.concat(this.payees.result.map(function (payee) {
        payee['_type'] = "payee";
        payee['name'] = payee.payToAccountName;
        return payee;
      }));

    });

    this.contacts = this.rest.get('/user/contactsAndImages');
    this.contacts.subscribe(response => {
      console.log('got the contacts and images from server..');

      this.persons = this.persons.concat(response.body.map(function (contact) {
        contact['_type'] = "contact";
        contact['name'] = contact.customer.firstName + " " + contact.customer.lastName;
        return contact;
      }));

    });

  }

  openModal(e : Event) {
    console.log("test");
    e.stopPropagation();
  }

  public selectedAccount(e : TypeaheadMatch){
    this.accountSelected.emit(e.value);
  }


}
