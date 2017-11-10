import { Component, OnInit } from '@angular/core';
import { SettingsTabComponent } from '../settings.component';
import { HttpObservable, RestClient } from '../../../services/rest-client.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, SettingsTabComponent {
  constructor() {
  }

  ngOnInit() {
  }

  saveEnabled(): boolean {
    return true;
  }

  save() {
  }
}
