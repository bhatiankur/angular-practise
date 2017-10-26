import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Product} from "../product.model";

@Component({
  selector: 'product-row',
  templateUrl: './product-row-component.component.html',
  styleUrls: ['./product-row-component.component.css']
})
export class ProductRowComponentComponent implements OnInit {

  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'item';

  constructor() { }

  ngOnInit() {
  }

}
