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
import { AuthService } from '../../auth/service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  public constructor(private authService: AuthService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let copiedReq = req.clone();
    if (!req.url.includes('/login')) {
      copiedReq = req.clone({ headers: req.headers.set('Authorization', `JWT ${this.authService.getToken()}`)});
    }
    return next.handle(copiedReq);
  }

}
