import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpRequest,
  HttpProgressEvent,
  HttpHandler,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor {

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const copiedReq = req.clone();
    return next.handle(copiedReq).pipe( tap(
      event => {
      }
    ));
  }
}
