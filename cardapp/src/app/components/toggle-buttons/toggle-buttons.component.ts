import {
  AfterViewInit, Component, ContentChildren, forwardRef, Inject, Input, OnInit, QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => ToggleButtonsComponent)}]
})
export class ToggleButtonsComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ContentChildren(forwardRef(() => ToggleButtonsItemComponent))
  items: QueryList<ToggleButtonsItemComponent>;

  selectedItem: ToggleButtonsItemComponent;
  onChangeFn;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onItemSelected(this.items.first);
    });
  }

  onItemSelected(item) {
    this.selectedItem = item;
    if (this.onChangeFn) {
      this.onChangeFn(this.selectedItem.value);
    }
  }

  writeValue(value: any) {
    if (this.items) {
      const item = this.items.find(it => it.value === value);
      if (item) {
        this.onItemSelected(item);
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any) {
  }

}

///////

@Component({
  selector: 'app-toggle-buttons-item',
  templateUrl: './toggle-buttons-item.component.html',
})
export class ToggleButtonsItemComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  value: string;

  constructor(@Inject(ToggleButtonsComponent) public parent: ToggleButtonsComponent) { }

  ngOnInit() {
  }

}
