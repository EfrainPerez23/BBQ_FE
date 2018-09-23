import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MaterialModule } from '../../material-module/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent]
})
export class GlobalModule { }
