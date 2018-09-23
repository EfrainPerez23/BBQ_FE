import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../model/map';
import { TooltipPosition } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
declare var google: any;
@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
  providers: [ NgbRatingConfig ]
})
export class MarkerComponent implements OnInit {

  @Input() public marker: Result;
  public toolTip: TooltipPosition =  'above';
  public googleApiPhoto = `${environment.googleMapApi}/place/photo?maxwidth=300&`;
  public googleMapKey = environment.googleMapKey;

  public constructor(private config: NgbRatingConfig) {
    this.config.max = 5;
  }

  ngOnInit() {
    // const a: Geocoder;
    this.googleApiPhoto += `photoreference=${this.marker.photos[0].photo_reference}&key=${this.googleMapKey}`;
    // const geocoder = new google.maps.Geocoder;
    // geocoder.geocode({'placeId': 'ChIJjXgrPuejrI8R52REsaWYlwI'}, function(results, status) {
    //   debugger;
    //   if (status === 'OK') {
    //   } else {
    //     window.alert('Geocoder failed due to: ' + status);
    //   }
    // });
  }

}
