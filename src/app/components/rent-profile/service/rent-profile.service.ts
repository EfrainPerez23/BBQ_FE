import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RentProfile } from '../model/rent-profile';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RentProfileService {

  // tslint:disable-next-line:max-line-length
  private filedParam = 'photo,vicinity,place_id,formatted_address,name,website,rating,formatted_phone_number,geometry,international_phone_number,reviews,opening_hours/weekday_text';
  private detailPath = `${environment.googleMapApi}/place/details/json`;

  public constructor(private http: HttpClient) { }

  public getPlaceDetail(placeId: string): Observable<RentProfile> {
    let params = new HttpParams();
    params = params.append('placeid', placeId);
    params = params.append('fields', this.filedParam);
    params = params.append('key', environment.googleMapKey);
    return this.http.get<RentProfile>(this.detailPath, { params });
  }
}
