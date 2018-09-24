import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapResults } from '../model/map';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private nearbyPlacePath = `${environment.googleMapApi}/place/nearbysearch/json`;
  private type = 'restaurant';
  private keyword = 'grill';

  public constructor(private http: HttpClient) { }

  public getNearbyGrillPlaces(lat: number, lng: number, radius: number): Observable<MapResults> {
    let params = new HttpParams();
    params = params.append('location', `${lat},${lng}`);
    params = params.append('radius', `${radius}`);
    params = params.append('type', this.type);
    params = params.append('keyword', this.keyword);
    params = params.append('key', environment.googleMapKey);
    return this.http.get<MapResults>(`${this.nearbyPlacePath}`, { params });
  }
}
