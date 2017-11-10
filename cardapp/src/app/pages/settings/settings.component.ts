import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SettingsAccordionComponent } from './accordion/settings-accordion.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CardSecurityComponent } from './cardSecurity/card-limits.component';
import { AccountSecurityComponent } from './accountSecurity/account-security.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChildren(SettingsAccordionComponent)
  public children: QueryList<SettingsAccordionComponent>;

  componentTypes = {ProfileComponent, NotificationsComponent, CardSecurityComponent, AccountSecurityComponent};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.children.forEach(child => {
      child.opened.subscribe((sender) => {
        this.closeAllExcept(sender);
      });
    });
  }

  closeAllExcept(component) {
    this.children.forEach(child => {
      if (component !== child) {
        child.contentContainer.clear();
      }
    });
  }

}

export interface SettingsTabComponent {
  saveEnabled(): boolean;
  save();
}
