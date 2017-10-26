import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowComponentComponent } from './product-row-component.component';

describe('ProductRowComponentComponent', () => {
  let component: ProductRowComponentComponent;
  let fixture: ComponentFixture<ProductRowComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRowComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
