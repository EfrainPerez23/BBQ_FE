import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentMapComponent } from './rent-map/rent-map.component';
import { RentProfileComponent } from './rent-profile/rent-profile.component';
import { MyRentsComponent } from './my-rents/my-rents.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from '../auth/service/auth-guard.service';

const routes: Routes = [
  { path: '', component: RentMapComponent, canActivate: [AuthGuardService] },
  { path: 'bbq/:id', component: RentProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'rents', component: MyRentsComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
