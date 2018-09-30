import { LocalStorageService } from './../../../global/services/local-storage.service';
import { AuthService, UserLogged } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { InvalidSnackBarComponent } from '../../../global/components/invalid-snack-bar/invalid-snack-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;

  public constructor(private authService: AuthService, private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public ngOnInit(): void { }

  public onSubmit(): void {
    if (this.form.value) {
      this.loading = true;
      this.authService.signIn(this.form.value).subscribe((user: UserLogged): void => {
        this.localStorageService.setItem('user', JSON.stringify(user));
        this.loading = false;
        window.location.href = '/';
      }, (error: HttpErrorResponse): void => {
        this.loading = false;
        let message = 'Try again...';
        if (error.status === 401) {
          message = error.error.description;
        }
        this.snackBar.openFromComponent(InvalidSnackBarComponent, {
          duration: 2000,
          data: message
        });
      });
    }
  }
}
