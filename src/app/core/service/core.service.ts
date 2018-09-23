import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private _sideNavSubject: Subject<void> = new Subject<void>();

  public constructor() { }

  public get sideNavSubject(): Subject<void> {
    return this._sideNavSubject;
  }
}
