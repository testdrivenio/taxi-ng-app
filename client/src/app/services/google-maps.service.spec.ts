import { TestBed } from '@angular/core/testing';

import { GoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {
  let googleMapsService: GoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GoogleMapsService ]
    });
    googleMapsService = TestBed.get(GoogleMapsService);
  });

  it('should exist', () => {
    expect(googleMapsService).toBeTruthy();
  });
});
