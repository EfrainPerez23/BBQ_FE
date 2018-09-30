import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { InvalidSnackBarComponent } from '../../global/components/invalid-snack-bar/invalid-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  public constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.snackBar.openFromComponent(InvalidSnackBarComponent, {
        duration: 2000,
        data: 'Please Sign in to continue...'
      });
      this.router.navigate(['/login']);
      return false;
    }
  }

  public canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
