import { Component, Input, OnInit } from '@angular/core';
import { MockPersonList } from './mock-person-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'app';

  persons: Array<any> = [];
  personsAttrs: Array<any> = [];

  constructor() {
    //loading static mock data
    let mock: MockPersonList = new MockPersonList();
    this.persons.push(mock.personListFromServer);
    this.persons.push(mock.personListFromServer1);
    this.personsAttrs.push(mock.personAttr1);
    this.personsAttrs.push(mock.personAttr2);
  }

  ngOnInit() {}

  public personIsPicked($event) {
    console.log('Received in the containing component --> Picked ' + $event.name);
  }
}
