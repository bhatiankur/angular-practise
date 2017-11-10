import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpObservable, RestClient } from '../../services/rest-client.service';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(NgForm) form: NgForm;

  authenticate: HttpObservable<any>;

  constructor(private rest: RestClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticate = this.rest.post('/user/authenticate/', {
      'username': this.form.controls['username'].value,
      'password': this.form.controls['password'].value
    });

    this.authenticate.subscribe(() => {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([returnUrl]);
    }, e => e);
  }

}
