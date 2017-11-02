import {Component, EventEmitter, Input, Output, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {NgbTypeaheadSelectItemEvent, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { PersonDataViewService } from './person-data-view.service';

@Component({
  selector: 'person-typeahead',
  templateUrl: './typeahead-person.component.html',
  styles: [`.form-control { width: 500px; }`]
})
export class TypeaheadPersonComponent implements OnInit {

  @Output() person: EventEmitter<any>;

  @Input() persons: Array<any>;
  @Input() personsAttrs: Array<any>;
  @ViewChild('p') public popover: NgbPopover;

  greeting = 'Hello world';

  personList: Array<any>;
  public model: any;

  constructor() {
    this.person = new EventEmitter();
  }

  ngOnInit() {
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

  showPopupWithAll() {
    console.log('reached here');
    this.popover.close();
    this.popover.open();
  }

  onSearchChange(e : Event) {
    console.log('reached here to close');
    this.popover.close();
  }
}
