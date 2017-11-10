import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatePhoneNumber} from "./phone-number.validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  fg : FormGroup;
  phoneNumber : AbstractControl;

  constructor(private fb :FormBuilder){}

  ngOnInit() {

    this.fg = new FormGroup({
      'mobileNumber': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        ValidatePhoneNumber('US')
      ])
    });

    this.phoneNumber = this.fg.controls['mobileNumber'];
  }
}
