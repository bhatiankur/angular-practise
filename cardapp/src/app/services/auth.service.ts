import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HttpObservable, RestClient } from './rest-client.service';

@Injectable()
// Auth service keeps the current logged in user
// Also serves as global route guard
export class AuthService implements CanActivate {
  customer: HttpObservable<any>;

  constructor(private rest: RestClient, private router: Router) {
  }

  resetCustomer() {
    this.customer = null;
  }

  canActivate(route: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> {
    this.customer = this.rest.get('/customer');
    return this.customer.map(() => true).catch(() => {
      this.router.navigate(['/login'], { queryParams: { returnUrl: routerStateSnapshot.url }});
      return Observable.of(false);
    });
  }
}
