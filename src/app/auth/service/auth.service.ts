import { LocalStorageService } from './../../global/services/local-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export interface UserLogged {
  token: string;
  user: {
    email: string,
    id: number,
    name: string,
    lastName: string
  };
}

export interface SignUpUser {
  name: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath = `${environment.bbqApi}/login`;
  private signUpPAth = `${environment.bbqApi}/user`;

  public constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  public signIn(data: {email: string, password: string}): Observable<UserLogged> {
    return this.httpClient.post<UserLogged>(this.loginPath, data);
  }

  public signUp(data: SignUpUser): Observable<{message: string, data: SignUpUser}> {
    return this.httpClient.post<{message: string, data: SignUpUser}>(this.signUpPAth, data);
  }

  public getToken(): string | null  {
    return this.localStorageService.getItem('user') ? JSON.parse(this.localStorageService.getItem('user'))['token'] : null;
  }

}
