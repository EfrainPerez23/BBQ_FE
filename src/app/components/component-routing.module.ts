import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentMapComponent } from './rent-map/rent-map.component';
import { RentProfileComponent } from './rent-profile/rent-profile.component';

const routes: Routes = [
  { path: '', component: RentMapComponent },
  { path: 'bbq/:id', component: RentProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
