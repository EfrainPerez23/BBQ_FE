import { CoreService } from './../service/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public constructor(private coreService: CoreService) { }

  public ngOnInit(): void { }

  public toggle(): void {
    this.coreService.sideNavSubject.next();
  }

}
