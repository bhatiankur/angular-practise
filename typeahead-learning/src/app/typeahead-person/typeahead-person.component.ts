import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'person-typeahead',
  templateUrl: './typeahead-person.component.html',
  styles: [`.form-control { width: 500px; }`]
})
export class TypeaheadPersonComponent {

  @Output() person: EventEmitter<any>;

  // optional - placeholder to be used when we have a pre defined static list.
  @Input() personList: Array<any>;

  public model: any;

  constructor() {
    this.person = new EventEmitter();
  }

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
