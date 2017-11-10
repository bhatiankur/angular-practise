import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayeeComponent } from './new-payee.component';

describe('NewPayeeComponent', () => {
  let component: NewPayeeComponent;
  let fixture: ComponentFixture<NewPayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
