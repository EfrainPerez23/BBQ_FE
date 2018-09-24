import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentProfileComponent } from './rent-profile.component';

describe('RentProfileComponent', () => {
  let component: RentProfileComponent;
  let fixture: ComponentFixture<RentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
