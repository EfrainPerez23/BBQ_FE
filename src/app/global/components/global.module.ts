import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MaterialModule } from '../../material-module/material.module';
import { InvalidSnackBarComponent } from './invalid-snack-bar/invalid-snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [StarRatingComponent, InvalidSnackBarComponent],
  exports: [StarRatingComponent, InvalidSnackBarComponent],
  entryComponents: [InvalidSnackBarComponent]
})
export class GlobalModule { }
