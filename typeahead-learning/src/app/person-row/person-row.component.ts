import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-person-row',
  templateUrl: './person-row.component.html',
  styleUrls: ['./person-row.component.css']
})
export class PersonRowComponent implements OnInit {

  @Input() person: any;
  isDeletable: boolean;
  @Input() isHeaderRow: boolean;
  @Input() headerLabels: Array<string>;

  constructor() {}

  ngOnInit() {
    if(this.person != undefined){
      this.isDeletable = this.person.isDeletable;
    }

    console.log('Person recieved ' + this.person._index );

  }

  deletePerson(person: any): boolean{
    //take the delete action
    console.log(person.name + ' was selected to delete in child..');
    return false;
  }

}
