import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public app: AppComponent, public auth: AuthService) {
  }

  ngOnInit() {
  }

  switchLanguage(event: any) {
    this.app.switchLanguage(event.target.selectedOptions[0].value);
  }

  navToggle() {
    this.app.showHomeNav = !this.app.showHomeNav;
  }


}
