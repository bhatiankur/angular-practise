import { Component, OnInit } from '@angular/core';
import { SettingsTabComponent } from '../settings.component';

@Component({
  templateUrl: './card-security.component.html',
  styleUrls: ['./card-security.component.scss']
})
export class CardSecurityComponent implements OnInit, SettingsTabComponent {
  constructor() {
  }

  ngOnInit() {
  }

  saveEnabled(): boolean {
    return false;
  }

  save() {
  }
}
