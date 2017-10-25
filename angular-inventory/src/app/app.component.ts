import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  
  products: Array<Product>;
  constructor(){
    this.products = [new Product('NICE', 'A very nice hat', 
    'http://lorempixel.com/400/200', ['Men', 'Accessories', 'Hat'], 29.99),
    new Product('NICE!', 'A very very nice hat', 
    'http://lorempixel.com/400/200', ['Women', 'Accessories', 'Hat'], 39.99),
    new Product('NICE!!', 'A very very very nice hat', 
    'http://lorempixel.com/400/200', ['Chilren', 'Accessories', 'Hat'], 49.99)];
  }
  productWasSelected(product: Product): void {
    console.log('Product Selected ' + product);
  }

}
