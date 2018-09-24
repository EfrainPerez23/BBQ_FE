import { Router } from '@angular/router';
import { RentService } from './../../service/rent.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Result } from '../../model/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BQQ } from '../../../../global/models/bqq';
import { HttpErrorResponse } from '@angular/common/http';
import { InvalidSnackBarComponent } from '../../../../global/components/invalid-snack-bar/invalid-snack-bar.component';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.scss']
})
export class RentModalComponent implements OnInit {


  public form: FormGroup;
  public grillModels: string[] = ['Gas grills', 'Infrared grills', 'Charcoal grills'];
  public loading: boolean;


  public constructor(
  public dialogRef: MatDialogRef<RentModalComponent>,
  @Inject(MAT_DIALOG_DATA) public result: Result, private snackBar: MatSnackBar,
  private rentService: RentService, private router: Router ) {
      this.form = new FormGroup({
        model: new FormControl(null, [Validators.required]),
        date: new FormControl(null)
      });
  }


  public ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.value) {
      this.loading = true;
      const bbq: BQQ = {
        id: null,
        favorite: false,
        latitude: this.result.geometry.location.lat,
        longitude: this.result.geometry.location.lng,
        model: this.form.value.model,
        name: this.result.name,
        photo: this.result.photos ? this.result.photos[0].photo_reference : '',
        placeId: this.result.place_id
      };
      this.rentService.rentBBQ(bbq).subscribe((data: {message: string, data: BQQ}): void => {
        if (data) {
          this.loading = false;
          this.dialogRef.close();
          this.snackBar.openFromComponent(InvalidSnackBarComponent, {
            duration: 2000,
            data: 'Thanks !'
          });
          this.router.navigate(['/rents']);
        }
      }, (error: HttpErrorResponse): void => {
        this.loading = false;
        let message = 'Try again...';
        if (error.status === 401) {
          message = error.error.description;
        } else if (error.status === 500) {
          message = 'You have already rent it. Select another one ';
        }
        this.snackBar.openFromComponent(InvalidSnackBarComponent, {
          duration: 2000,
          data: message
        });
      });
      this.loading = true;
    }

  }

}
