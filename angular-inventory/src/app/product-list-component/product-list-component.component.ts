import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {

  @Input() productList: Array<Product>;
  @Output() onProductSelected: EventEmitter<Product>;

  private currentProduct: Product;

  constructor() {
      this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if(!product || !this.currentProduct){
      return false;
    }
    console.log('Something is selected..');
    console.log(product.sku == this.currentProduct.sku);
    return product.sku == this.currentProduct.sku;
  }

  ngOnInit() {
  }

}
