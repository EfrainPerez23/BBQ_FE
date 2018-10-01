import { LocalStorageService } from './../../../global/services/local-storage.service';
import { RentService } from './../../rent-map/service/rent.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BQQ } from '../../../global/models/bqq';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { InvalidSnackBarComponent } from '../../../global/components/invalid-snack-bar/invalid-snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {


  @Input() public rent: BQQ;
  @Output() public deleted: EventEmitter<number> = new EventEmitter<number>();
  public loading: boolean;
  public googleApiPhoto = `${environment.googleMapApi}/place/photo?maxwidth=250&`;

  public constructor(private rentService: RentService, private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService, private router: Router) { }

  public ngOnInit(): void {
    if (this.rent.photo) {
      this.googleApiPhoto += `photoreference=${this.rent.photo}&key=${environment.googleMapKey}`;
    } else {
      this.googleApiPhoto = 'assets/img/grill.jpg';
    }
  }

  public favorite(): void {
    this.loading = true;
    this.rentService.favoriteRent(this.rent).subscribe(((data: {message: string, data: BQQ}): void => {
      if (data) {
        this.rent.favorite = data.data.favorite;
        this.snackBar.openFromComponent(InvalidSnackBarComponent, {
          duration: 3000,
          data: this.rent.favorite ? 'Added to favorite' : 'Remove from favorite'
        });
      }
      this.loading = false;
    }), (error: HttpErrorResponse): void => {
      this.loading = false;
      let message = 'Try again...';
      if (error.status === 401) {
        message = error.error.description;
        this.localStorageService.clearLocalStorage();
        this.router.navigate(['/login']);
      }
      this.snackBar.openFromComponent(InvalidSnackBarComponent, {
        duration: 3000,
        data: message
      });
    });
  }

  public deleteRent(): void {
    this.loading = true;
    this.rentService.deleteRent(this.rent.id).subscribe((data: {message: string, data: { id: string}}): void => {
      if (data) {
        this.deleted.emit(this.rent.id);
        this.snackBar.openFromComponent(InvalidSnackBarComponent, {
          duration: 3000,
          data: 'Deleted !'
        });
      }
      this.loading = false;
    }, (error: HttpErrorResponse): void => {
      this.loading = false;
      let message = 'Try again...';
      if (error.status === 401) {
        message = error.error.description;
        this.localStorageService.clearLocalStorage();
        this.router.navigate(['/login']);
      }
      this.snackBar.openFromComponent(InvalidSnackBarComponent, {
        duration: 3000,
        data: message
      });
    });
  }

}
