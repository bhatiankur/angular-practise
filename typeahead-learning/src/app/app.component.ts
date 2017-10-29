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

  constructor() {
    this.persons.push((new MockPersonList()).getPersonList());
    this.persons.push((new MockPersonList()).getPersonList1());
    console.log(' Persons at source ' + this.persons.length);
  }

  ngOnInit() {}

  public personIsPicked($event) {
    console.log('Received in the containing component --> Picked ' + $event.name);
  }
}
