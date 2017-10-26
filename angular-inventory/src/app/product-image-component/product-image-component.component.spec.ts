import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageComponentComponent } from './product-image-component.component';

describe('ProductImageComponentComponent', () => {
  let component: ProductImageComponentComponent;
  let fixture: ComponentFixture<ProductImageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
