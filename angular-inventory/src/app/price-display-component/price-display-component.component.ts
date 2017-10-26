import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'price-display',
  templateUrl: './price-display-component.component.html',
  styleUrls: ['./price-display-component.component.css']
})
export class PriceDisplayComponentComponent implements OnInit {

  @Input() price: number;
  constructor() { }

  ngOnInit() {
  }

}
