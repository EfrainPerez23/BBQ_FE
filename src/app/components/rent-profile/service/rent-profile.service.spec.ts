import { TestBed } from '@angular/core/testing';

import { RentProfileService } from './rent-profile.service';

describe('RentProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentProfileService = TestBed.get(RentProfileService);
    expect(service).toBeTruthy();
  });
});
