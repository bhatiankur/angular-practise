import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => DatePickerComponent)}]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  inputId: string;

  @Input()
  placeholder: string;

  private onChangeFn;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  onChange(value: Date) {
    this.onChangeFn(value.toJSON());
  }

  writeValue(value: any) {
    this.el.nativeElement.querySelector('input').value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any) {
  }

}
