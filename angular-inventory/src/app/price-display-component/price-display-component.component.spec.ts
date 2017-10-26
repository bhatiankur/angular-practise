import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDisplayComponentComponent } from './price-display-component.component';

describe('PriceDisplayComponentComponent', () => {
  let component: PriceDisplayComponentComponent;
  let fixture: ComponentFixture<PriceDisplayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDisplayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
