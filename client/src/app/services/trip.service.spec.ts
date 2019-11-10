import {
  HttpClientTestingModule, HttpTestingController, TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { TripFactory } from '../testing/factories';

describe('TripService', () => {
  let tripService: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    tripService = TestBed.get(TripService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should allow a user to get a list of trips', () => {
    const trip1 = TripFactory.create();
    const trip2 = TripFactory.create();
    tripService.getTrips().subscribe(trips => {
      expect(trips).toEqual([trip1, trip2]);
    });
    const request: TestRequest = httpMock.expectOne('/api/trip/');
    request.flush([
      trip1,
      trip2
    ]);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
