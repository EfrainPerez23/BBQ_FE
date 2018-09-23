
import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { CoreService } from './core/service/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public mobileQuery: MediaQueryList;
  private _sideNav: MatSidenav;

  public constructor(private media: MediaMatcher, private coreService: CoreService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  public ngOnInit(): void {
    this.coreService.sideNavSubject.subscribe((): void => {
      this._sideNav.toggle();
    });
  }

  @ViewChild('sideNav')
  public set sideNave(_sideNav: MatSidenav) {
    this._sideNav = _sideNav;
  }
}
