import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from '../../global/services/local-storage.service';
import { User } from '../../global/models/user';
import { ProfileService } from './service/profile.service';
import { InvalidSnackBarComponent } from '../../global/components/invalid-snack-bar/invalid-snack-bar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form: FormGroup;
  public lat: number;
  public lng: number;
  public loading: boolean;

  private user: { token: string, user: User } | null;

  public constructor(private localStorageService: LocalStorageService, private profileService: ProfileService,
  private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      coords: new FormControl(null, [Validators.required]),
      lastPassword: new FormControl(null, [Validators.required]),
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
    this.user = JSON.parse(this.localStorageService.getItem('user'));
    if (this.user) {
      this.lat = this.user.user.latitude;
      this.lng = this.user.user.longitude;
      this.form.get('coords').setValue({ lat: this.lat, lng: this.lng });
      this.form.get('name').setValue(this.user.user.name);
      this.form.get('lastName').setValue(this.user.user.lastName);
      this.form.get('age').setValue(this.user.user.age);
      this.form.get('email').setValue(this.user.user.email);
    }

  }

  public ngOnInit(): void {
  }

  public mapClick(position: {coords: {lat: number, lng: number}}): void {
    const coords: { lat: number, lng: number } = position.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
    this.form.get('coords').setValue(coords);
  }


  public onSubmit(): void {
    if (this.form.value) {
      const values = this.form.value;
      const body = {
        id: this.user.user.id,
        name: values.name,
        lastName: values.lastName,
        age: values.age,
        latitude: values.coords.latitude,
        longitude: values.coords.longitude,
        email: values.email,
        oldPassword: values.lastPassword,
        newPassword: values.passwords.confirmPassword
      };
      this.loading = true;
      this.profileService.updateUser(body).subscribe((updated: { message: string, user: User }): void => {
        if (updated) {
          this.snackBar.openFromComponent(InvalidSnackBarComponent, {
            duration: 2000,
            data: updated.message
          });
          this.form.get('name').setValue(updated.user.name);
          this.form.get('lastName').setValue(updated.user.lastName);
          this.form.get('age').setValue(updated.user.age);
          this.form.get('email').setValue(updated.user.email);
        }
        this.loading = false;
      }, (error: HttpErrorResponse): void => {
        this.loading = false;
        this.snackBar.openFromComponent(InvalidSnackBarComponent, {
          duration: 2000,
          data: error.error.message
        });
      });
    }
  }


  private matchPassword(formGroup: AbstractControl): { [invalid: string]: boolean } | null {
    if (formGroup.get('password').value !== formGroup.get('confirmPassword').value) {
      return { invalid: true };
    }
    return null;
  }

}
