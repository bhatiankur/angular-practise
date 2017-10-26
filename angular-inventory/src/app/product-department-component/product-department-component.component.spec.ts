import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDepartmentComponentComponent } from './product-department-component.component';

describe('ProductDepartmentComponentComponent', () => {
  let component: ProductDepartmentComponentComponent;
  let fixture: ComponentFixture<ProductDepartmentComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDepartmentComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDepartmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
