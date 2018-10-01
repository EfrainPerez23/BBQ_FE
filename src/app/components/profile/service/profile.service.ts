import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../global/models/user';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userPath = '/user';

  public constructor(private http: HttpClient) { }


  public updateUser(body: any): Observable<{ message: string, user: User }> {
    return this.http.put<{ message: string, user: User }>(`${environment.bbqApi}${this.userPath}`, body);
  }
}
