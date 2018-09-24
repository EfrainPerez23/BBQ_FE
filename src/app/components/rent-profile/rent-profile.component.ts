import { RentProfileService } from './service/rent-profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RentProfile, RentResult } from './model/rent-profile';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-rent-profile',
  templateUrl: './rent-profile.component.html',
  styleUrls: ['./rent-profile.component.scss']
})
export class RentProfileComponent implements OnInit {

  public rentResult: RentResult;
  public googleApiPhoto = `${environment.googleMapApi}/place/photo?maxwidth=2600&`;

  public constructor(private route: ActivatedRoute, private rentProfileService: RentProfileService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      if (params && params.id) {
        this.rentProfileService.getPlaceDetail(params.id).subscribe((rentProfile: RentProfile): void => {
          if (rentProfile) {
            this.rentResult = rentProfile.result;
            if (rentProfile.result.photos) {
              rentProfile.result.photos = _.orderBy(rentProfile.result.photos, ['width'], ['desc']);
              this.googleApiPhoto += `photoreference=${rentProfile.result.photos[0].photo_reference}&key=${environment.googleMapKey}`;
              console.log(rentProfile);
            }
          }
        });
      }
    });
  }

}
