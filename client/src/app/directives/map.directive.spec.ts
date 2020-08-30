import { TestBed } from '@angular/core/testing';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { MapDirective } from './map.directive';

describe('MapDirective', () => {
  let directive: MapDirective;

  class MockGoogleMapsAPIWrapper {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapDirective
      ],
      providers: [
        { provide: GoogleMapsAPIWrapper, useClass: MockGoogleMapsAPIWrapper }
      ]
    });
  });
  it('should create an instance', () => {
    directive = new MapDirective(new GoogleMapsAPIWrapper(null, null));
    expect(directive).toBeTruthy();
  });
});
