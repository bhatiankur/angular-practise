import { Component, Input, OnInit } from '@angular/core';
import { PersonDataService } from './person-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  title = 'app';

  personList: Array<any>;
  
  constructor() {
    this.personList = (new PersonDataService()).getPersonList();
  }

  ngOnInit() {}

  public personIsPicked($event) {
    console.log('Received in the containing component --> Picked ' + $event.name);
  }
}
