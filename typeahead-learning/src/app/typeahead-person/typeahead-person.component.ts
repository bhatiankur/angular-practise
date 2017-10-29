import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import { PersonDataViewService } from './person-data.service';

@Component({
  selector: 'person-typeahead',
  templateUrl: './typeahead-person.component.html',
  styles: [`.form-control { width: 500px; }`]
})
export class TypeaheadPersonComponent implements OnInit {

  @Output() person: EventEmitter<any>;

  @Input() persons: Array<any>;
  @Input() personsAttrs: Array<any>;

  personList: Array<any>;
  public model: any;

  constructor() {
    this.person = new EventEmitter();    
  }

  ngOnInit() {
    console.log('persons at receiving end' + this.persons.length);
    this.personList = (new PersonDataViewService(this.persons, this.personsAttrs)).getPersonList();   
  }

  // This method definition contains the searching and filtering opertion
  search = (text$: Observable<string>) => {    
    return  text$.debounceTime(200)
      .map(term => term === '' ? []
        : this.personList
        .filter(v => (v.name.toLowerCase().indexOf(term.toLowerCase()) > -1) || (v._isHeaderRow === true) )
        .slice(0, 100));

  }

  formatter = (x: {name: string}) => x.name;

  /*----------------------------------------------------------------------------------------------
    This is an API method used to catch the selected match and send it out to the containing component
  ------------------------------------------------------------------------------------------------*/

  itemSelected(event: NgbTypeaheadSelectItemEvent){
    console.log('Received in the typeahead component: itemSelected() method......'+ event.item.name);
    this.person.emit(event.item);
  }
}
