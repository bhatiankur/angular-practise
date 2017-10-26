import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Product} from "../product.model";

@Component({
  selector: 'product-image',
  templateUrl: './product-image-component.component.html',
  styleUrls: ['./product-image-component.component.css']
})
export class ProductImageComponentComponent implements OnInit {

  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'ui small image';
  constructor() { }

  ngOnInit() {
  }

}
