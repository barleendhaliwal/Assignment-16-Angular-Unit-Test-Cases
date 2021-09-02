import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mockCustomer, mockUser } from './http-request.service.spec';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorMockService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const userBaseUrl = environment.BASE_URL_USERS
    const customerBaseUrl = environment.BASE_URL_CUSTOMERS

    if(request.method==='DELETE')
      return of(new HttpResponse({ status: 204}));

    if (request.url && request.url.indexOf(customerBaseUrl) > -1) {
      if(request.url.endsWith('users'))
      return of(new HttpResponse({ status: 200, body: mockUser }));
      return of(new HttpResponse({ status: 200, body: mockCustomer }));
    }
    if (request.url && request.url.indexOf(userBaseUrl) > -1) {
      return of(new HttpResponse({ status: 200, body: mockUser }))
    }



    return next.handle(request);
  }
}
