import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentMapComponent } from './rent-map/rent-map.component';
import { RentProfileComponent } from './rent-profile/rent-profile.component';
import { MyRentsComponent } from './my-rents/my-rents.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: RentMapComponent },
  { path: 'bbq/:id', component: RentProfileComponent },
  { path: 'rents', component: MyRentsComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
