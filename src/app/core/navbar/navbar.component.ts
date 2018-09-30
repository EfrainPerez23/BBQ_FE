import { AuthService } from './../../auth/service/auth.service';
import { CoreService } from './../service/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public isAuthenticated: boolean;

  public constructor(private coreService: CoreService, private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public ngOnInit(): void { }

  public toggle(): void {
    this.coreService.sideNavSubject.next();
  }

}
