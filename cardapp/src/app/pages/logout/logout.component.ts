import { Component, OnInit } from '@angular/core';
import { HttpObservable, RestClient } from '../../services/rest-client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  logout: HttpObservable<any>;

  constructor(private rest: RestClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.logout = this.rest.get('/user/logout');
    this.logout.subscribe(() => {
      this.auth.resetCustomer();
    });
  }

}
