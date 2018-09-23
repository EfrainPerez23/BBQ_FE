import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentMapComponent } from './rent-map/rent-map.component';

const routes: Routes = [
  { path: '', component: RentMapComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
