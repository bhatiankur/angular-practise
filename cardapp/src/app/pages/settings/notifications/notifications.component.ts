import { Component, OnInit } from '@angular/core';
import { SettingsTabComponent } from '../settings.component';

@Component({
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, SettingsTabComponent {

  ngOnInit() {
  }

  saveEnabled(): boolean {
    return true;
  }

  save() {

  }
}
