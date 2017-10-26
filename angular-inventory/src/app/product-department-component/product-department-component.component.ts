import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product.model";

@Component({
  selector: 'product-department',
  templateUrl: './product-department-component.component.html',
  styleUrls: ['./product-department-component.component.css']
})
export class ProductDepartmentComponentComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
