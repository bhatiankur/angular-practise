import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(event => {
      if (event instanceof HttpErrorResponse) {
        if (event.status === 403) {
          const currentUrl = this.router.routerState.snapshot.url;
          if (currentUrl && !currentUrl.includes('/login')) { ///
            this.router.navigate(['/login'], {queryParams: {returnUrl: currentUrl}});
          }
        }
      }
      return Observable.throw(event);
    });
  }
}
