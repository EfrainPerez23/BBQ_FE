import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapResults } from '../model/map';
import { environment } from '../../../../environments/environment';
import { BQQ } from '../../../global/models/bqq';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private nearbyPlacePath = `${environment.googleMapApi}/place/nearbysearch/json`;
  private rentPath = `${environment.bbqApi}/bbq`;
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
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return this.http.get<MapResults>(`${this.nearbyPlacePath}`, { params, headers });
  }

  public rentBBQ(bbq: BQQ ): Observable<{message: string, data: BQQ}> {
    return this.http.post<{message: string, data: BQQ}>(this.rentPath, bbq);
  }

  public getAllRents(): Observable<{message: string, data: BQQ[]}> {
    return this.http.get<{message: string, data: BQQ[]}>(this.rentPath);
  }

  public favoriteRent(bbq: BQQ ): Observable<{message: string, data: BQQ}> {
    bbq.favorite = !bbq.favorite;
    return this.http.put<{message: string, data: BQQ}>(`${this.rentPath}/${bbq.id}`, bbq);
  }

  public deleteRent(id: number): Observable<{message: string, data: {id: string}}> {
    return this.http.delete<{message: string, data: {id: string}}>(`${this.rentPath}/${id}`);
  }

}
