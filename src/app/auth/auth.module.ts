import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MaterialModule } from '../material-module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from '../global/components/global.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey,
      libraries: ['places', 'geometry']
    }),
    HttpClientModule,
    GlobalModule
  ],
  declarations: [ AuthComponent, SignInComponent, SignUpComponent ],
  exports: [ AuthComponent, SignInComponent, SignUpComponent ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class AuthModule { }
