import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { ProductRowComponentComponent } from './product-row-component/product-row-component.component';
import { ProductImageComponentComponent } from './product-image-component/product-image-component.component';
import { PriceDisplayComponentComponent } from './price-display-component/price-display-component.component';
import { ProductDepartmentComponentComponent } from './product-department-component/product-department-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponentComponent,
    ProductRowComponentComponent,
    ProductImageComponentComponent,
    PriceDisplayComponentComponent,
    ProductDepartmentComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
