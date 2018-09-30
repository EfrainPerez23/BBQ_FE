import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignUpUser } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvalidSnackBarComponent } from '../../../global/components/invalid-snack-bar/invalid-snack-bar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;
  public lat: number;
  public lng: number;
  public loading: boolean;

  public constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      coords: new FormControl(null, [Validators.required]),
      passwords: new FormGroup({
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required])
      }, this.matchPassword)
    });

    if (navigator) {
      navigator.geolocation.getCurrentPosition((position: Position): void => {
        const coords: Coordinates = position.coords;
        this.lat = coords.latitude;
        this.lng = coords.longitude;
        this.form.get('coords').setValue(coords);
      });
    }
  }

  public ngOnInit(): void { }

  public onSubmit(): void {
    if (this.form.value) {
      const values: any = this.form.value;
      const data: SignUpUser = {
        name: values.name,
        lastName: values.lastName,
        age: values.age,
        email: values.email,
        password: values.passwords.confirmPassword,
        latitude: values.coords.lat,
        longitude: values.coords.lng

      };
      this.authService.signUp(data).subscribe((newUser: {message: string, data: SignUpUser}): void => {
        if (newUser) {
          this.snackBar.openFromComponent(InvalidSnackBarComponent, {
            duration: 2000,
            data: 'Please Sign in to continue...'
          });
        }
        this.loading = false;
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

  public mapClick(position: {coords: {lat: number, lng: number}}): void {
    const coords: { lat: number, lng: number } = position.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
    this.form.get('coords').setValue(coords);
  }

  private matchPassword(formGroup: AbstractControl): { [invalid: string]: boolean } | null {
    if (formGroup.get('password').value !== formGroup.get('confirmPassword').value) {
      return { invalid: true };
    }
    return null;
  }

}
