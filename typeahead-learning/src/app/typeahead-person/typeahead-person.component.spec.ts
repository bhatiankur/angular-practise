import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadPersonComponent } from './typeahead-person.component';

describe('TypeaheadPersonComponent', () => {
  let component: TypeaheadPersonComponent;
  let fixture: ComponentFixture<TypeaheadPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
