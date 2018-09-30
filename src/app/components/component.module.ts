import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RentMapComponent } from './rent-map/rent-map.component';
import { MarkerComponent } from './rent-map/marker/marker.component';
import { MaterialModule } from '../material-module/material.module';
import { environment } from '../../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GlobalModule } from '../global/components/global.module';
import { SafeUrlPipe } from '../global/pipes/safe-url.pipe';
import { RentModalComponent } from './rent-map/marker/rent-modal/rent-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RentProfileComponent } from './rent-profile/rent-profile.component';
import { MyRentsComponent } from './my-rents/my-rents.component';
import { RentComponent } from './my-rents/rent/rent.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptorService } from '../global/services/interceptor.service';
import { LoginInterceptorService } from '../auth/service/login-interceptor.service';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_SNACK_BAR_DATA } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey,
      libraries: ['places', 'geometry']
    }),
    AgmSnazzyInfoWindowModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    GlobalModule,
    ReactiveFormsModule
  ],
  declarations: [
    RentMapComponent,
    MarkerComponent,
    SafeUrlPipe,
    RentModalComponent,
    RentProfileComponent,
    MyRentsComponent,
    RentComponent,
    ProfileComponent
  ],
  exports: [
    RentMapComponent,
    MarkerComponent,
    RentModalComponent,
    RentProfileComponent,
    MyRentsComponent,
    RentComponent
  ],
  entryComponents: [RentModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi: true },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_SNACK_BAR_DATA, useValue: [] },
  ]
})
export class ComponentModule {}
