import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsTabComponent } from '../settings.component';
import { HttpObservable, RestClient } from '../../../services/rest-client.service';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent implements OnInit, SettingsTabComponent {
  @ViewChild(NgForm) form: NgForm;

  request: HttpObservable<any>;

  constructor(private rest: RestClient) {

  }

  ngOnInit() {
  }

  private saveInProgress(): boolean {
    return this.request != null && this.request.inProgress();
  }

  saveEnabled(): boolean {
    return !this.saveInProgress() && this.form && this.form.valid;
  }

  save() {
    this.request = this.rest.post('/user/changePassword', {
      oldPassword: this.form.controls['oldPassword'].value,
      newPassword: this.form.controls['newPassword'].value,
      newPasswordCheck: this.form.controls['newPasswordCheck'].value
    });
  }
}
