import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form: FormGroup;
  public lat: number;
  public lng: number;

  public constructor() {
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
    console.log(this.form);
  }


  private matchPassword(formGroup: AbstractControl): { [invalid: string]: boolean } | null {
    if (formGroup.get('password').value !== formGroup.get('confirmPassword').value) {
      return { invalid: true };
    }
    return null;
  }

}
