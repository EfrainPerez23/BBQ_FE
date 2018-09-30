import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidSnackBarComponent } from './invalid-snack-bar.component';

describe('InvalidSnackBarComponent', () => {
  let component: InvalidSnackBarComponent;
  let fixture: ComponentFixture<InvalidSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
