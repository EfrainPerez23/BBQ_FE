import { Component, OnInit, Input } from '@angular/core';
import { BQQ } from '../../../global/models/bqq';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {


  @Input() public rent?: BQQ;

  public constructor() { }

  public ngOnInit(): void { }

}
