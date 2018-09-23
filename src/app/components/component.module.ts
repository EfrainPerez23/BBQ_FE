import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RentMapComponent } from './rent-map/rent-map.component';
import { MarkerComponent } from './rent-map/marker/marker.component';
import { MaterialModule } from '../material-module/material.module';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GlobalModule } from '../global/components/global.module';
import { SafeUrlPipe } from '../global/pipes/safe-url.pipe';
import { RentModalComponent } from './rent-map/marker/rent-modal/rent-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


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
  declarations: [RentMapComponent, MarkerComponent, SafeUrlPipe, RentModalComponent],
  exports: [RentMapComponent, MarkerComponent, RentModalComponent],
  entryComponents: [RentModalComponent]
})
export class ComponentModule { }
