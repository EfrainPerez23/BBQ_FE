import { RentProfileService } from './service/rent-profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RentProfile, RentResult } from './model/rent-profile';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { TooltipPosition, MatDialogRef, MatDialog } from '@angular/material';
import { RentModalComponent } from '../rent-map/marker/rent-modal/rent-modal.component';

@Component({
  selector: 'app-rent-profile',
  templateUrl: './rent-profile.component.html',
  styleUrls: ['./rent-profile.component.scss']
})
export class RentProfileComponent implements OnInit {

  public rentResult: RentResult;
  public googleApiPhoto = `${environment.googleMapApi}/place/photo?maxwidth=2600&`;
  public toolTip: TooltipPosition = 'above';

  public constructor(private route: ActivatedRoute, private rentProfileService: RentProfileService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params && params.id) {
        this.rentProfileService.getPlaceDetail(params.id).subscribe((rentProfile: RentProfile): void => {
          if (rentProfile) {
            this.rentResult = rentProfile.result;
            if (rentProfile.result.photos) {
              rentProfile.result.photos = _.orderBy(rentProfile.result.photos, ['width'], ['desc']);
              this.googleApiPhoto += `photoreference=${rentProfile.result.photos[0].photo_reference}&key=${environment.googleMapKey}`;
            }
          }
        });
      }
    });
  }

  public rentIt(): void {
    const dialogRef: MatDialogRef<RentModalComponent, any> = this.dialog.open(RentModalComponent, {
      width: '500px',
      data: this.rentResult
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.rentResult);
    });
  }

}
