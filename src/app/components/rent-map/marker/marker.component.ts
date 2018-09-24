import { Component, OnInit, Input, Inject } from '@angular/core';
import { Result } from '../model/map';
import { TooltipPosition, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { RentModalComponent } from './rent-modal/rent-modal.component';

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

  public constructor(private config: NgbRatingConfig, private dialog: MatDialog) {
    this.config.max = 5;
  }

  public ngOnInit(): void {
    this.googleApiPhoto += `photoreference=${this.marker.photos[0].photo_reference}&key=${this.googleMapKey}`;
  }

  public rentIt(): void {
    const dialogRef: MatDialogRef<RentModalComponent, any> = this.dialog.open(RentModalComponent, {
      width: '500px',
      data: this.marker
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.marker);
    });
  }

}
