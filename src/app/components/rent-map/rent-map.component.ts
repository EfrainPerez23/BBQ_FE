import { LocalStorageService } from './../../global/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { RentService } from './service/rent.service';
import { MapResults, Result } from './model/map';

@Component({
  selector: 'app-rent-map',
  templateUrl: './rent-map.component.html',
  styleUrls: ['./rent-map.component.scss']
})
export class RentMapComponent implements OnInit {

  private _loaded: boolean;
  private _results: Result[] = [];

  lat = 51.678418;
  lng = 7.809007;

  public constructor(private rentService: RentService, private localStorage: LocalStorageService) {
    const data: any = JSON.parse(this.localStorage.getItem('user'));
    this.lat = data ? data.user.latitude : this.lat;
    this.lng = data ? data.user.longitude : this.lng;
    this.rentService.getNearbyGrillPlaces(this.lat, this.lng, 5000).subscribe((results: MapResults): void => {
      if (results) {
        this._results = results.results;
      }
    });
  }

  public ngOnInit(): void { }

  public get loaded(): boolean {
    return this._loaded;
  }

  public get results(): Result[] {
    return this._results;
  }

}
