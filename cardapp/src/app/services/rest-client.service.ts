import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';


// Enhanced observable with objects containing success and errors response.
// Response values are initially null and will receive values once http result is available.
// Useful for binding from html templates
export type HttpObservable<T> = Observable<T> & {
  result: T;
  errorResponse: HttpErrorResponse;
  inProgress(): boolean;
};

@Injectable()
export class RestClient {

  constructor(private http: HttpClient) {
  }

  private getUrl(url: String) {
    return '/waiv-service/json/v1/api' + url;
  }

  private getRequestHeaders() {
    return new HttpHeaders().set('Authorization', 'Basic ' + btoa('admin_api:admin'));
  }

  // Angular's responseType 'json' works only on success result, not on error result body. Also, it fails with json
  // parsing error if result body is empty (some WAIV rest api calls return empty body)
  // So we're using responseType 'text' and converting to json ourselves
  private toJson<T>(responseObservable: Observable<HttpResponse<string>>): Observable<T> {
    return responseObservable.map(resp => {
      if (resp.body && /json/.test(resp.headers.get('Content-Type'))) {
        return JSON.parse(resp.body);
      }
      return resp.body || {};
    }).catch(resp => {
      if (resp.error && /json/.test(resp.headers.get('Content-Type'))) {
        resp.error = JSON.parse(resp.error);
      }
      return Observable.throw(resp);
    });
  }

  private createHttpParams(params: any): HttpParams {
    if (!params) {
      return null;
    }
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
  }

  private _get<T>(url: String, params?: any): Observable<T> {
    const headers = this.getRequestHeaders();
    return this.toJson(this.http.get(this.getUrl(url), {
      headers, params: this.createHttpParams(params),
      observe: 'response', responseType: 'text'
    }));
  }

  private _post<T>(url: String, body: any, params?: any): Observable<T> {
    const headers = this.getRequestHeaders();
    return this.toJson(this.http.post(this.getUrl(url), body, {
      headers, params: this.createHttpParams(params),
      observe: 'response', responseType: 'text'
    }));
  }

  private _delete<T>(url: String, params?: any): Observable<T> {
    const headers = this.getRequestHeaders();
    return this.toJson(this.http.delete(this.getUrl(url),{
      headers, params: this.createHttpParams(params),
      observe: 'response', responseType: 'text'
    }));
  }

  ////////////

  private makeHttpObservable<T>(observable: Observable<T>): HttpObservable<T> {
    observable = observable.share();

    const httpObservable: HttpObservable<T> = Object.assign(observable,
      {
        result: null as T,
        errorResponse: null as HttpErrorResponse,

        inProgress() {
          return this.result === null && this.errorResponse === null;
        }
      });

    observable.subscribe(resp => {
      httpObservable.result = resp;
    }, resp => {
      httpObservable.errorResponse = resp;
    });

    return httpObservable;
  }

  get<T>(url: String, params?: any): HttpObservable<T> {
    return this.makeHttpObservable(this._get<T>(url, params));
  }

  post<T>(url: String, body: any, params?: any): HttpObservable<T> {
    return this.makeHttpObservable(this._post<T>(url, body, params));
  }

  delete<T>(url: String, params?: any): HttpObservable<T> {
    return this.makeHttpObservable(this._delete<T>(url, params));
  }
}
