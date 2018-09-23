import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../model/map';
import { TooltipPosition } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
  providers: [ NgbRatingConfig ]
})
export class MarkerComponent implements OnInit {

  @Input() public marker: Result;
  public toolTip: TooltipPosition =  'above';
  public googleApiPhoto = `${environment.googleMapApi}/place/photo?maxwidth=400&`;
  public googleMapKey = environment.googleMapKey;

  public constructor(private config: NgbRatingConfig) {
    this.config.max = 5;
  }

  ngOnInit() {
    this.googleApiPhoto += `photoreference=${this.marker.photos[0].photo_reference}&key=${this.googleMapKey}`;
  }

}
