import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  @Input() result : any;
  list: Array<any> = [];

  constructor() { }

  ngOnInit() {
    console.log('Number of objects in list  ' + this.result);
    this.list.push(this.result);
  }

}
