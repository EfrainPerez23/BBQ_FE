import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpRequest,
  HttpProgressEvent,
  HttpHandler,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../../auth/service/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { InvalidSnackBarComponent } from '../components/invalid-snack-bar/invalid-snack-bar.component';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  public constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router,
  private localStorageService: LocalStorageService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let copiedReq = req.clone();
    copiedReq = req.clone({ headers: req.headers.set('Authorization', `JWT ${this.authService.getToken()}`)});
    return next.handle(copiedReq).pipe( tap(
      (event: any) => {
      }, (err: any): any => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.localStorageService.clearLocalStorage();
            this.snackBar.openFromComponent(InvalidSnackBarComponent, {
              duration: 2000,
              data: 'Please Sign in to continue...'
            });
            this.router.navigate(['/login']);
          }
        }
      }
    ));
  }

}
