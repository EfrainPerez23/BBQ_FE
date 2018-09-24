import { Router } from '@angular/router';
import { LocalStorageService } from './../../global/services/local-storage.service';
import { BQQ } from './../../global/models/bqq';
import { RentService } from './../rent-map/service/rent.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { InvalidSnackBarComponent } from '../../global/components/invalid-snack-bar/invalid-snack-bar.component';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-my-rents',
  templateUrl: './my-rents.component.html',
  styleUrls: ['./my-rents.component.scss']
})
export class MyRentsComponent implements OnInit {

  public rents: {message: string, data: BQQ[]};
  public loading: boolean;

  constructor(private rentService: RentService, private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService, private router: Router) {
    this.rentService.getAllRents().subscribe((data: {message: string, data: BQQ[]}): void => {
      if (data) {
        this.rents = data;
      }
    }, (error: HttpErrorResponse): void => {
      this.loading = false;
      let message = 'Try again...';
      if (error.status === 401) {
        message = error.error.description;
        this.localStorageService.clearLocalStorage();
        this.router.navigate(['/login']);
      }
      this.snackBar.openFromComponent(InvalidSnackBarComponent, {
        duration: 2000,
        data: message
      });
    });
  }

  ngOnInit() {
  }

  public delete(id: number): void {
    this.rents.data = _.remove(this.rents.data, (data: BQQ) => {
      return id === data.id;
    });
  }

}
