import { Observable, of } from 'rxjs';

import { Trip } from '../services/trip.service';
import { TripListResolver } from './trip-list.resolver';
import { createFakeTrip } from '../testing/factories';

describe('TripListResolver', () => {
  it('should resolve a list of trips', () => {
    const tripsMock: Trip[] = [
      createFakeTrip(),
      createFakeTrip()
    ];
    const tripServiceMock: any = {
      getTrips: (): Observable<Trip[]> => {
        return of(tripsMock);
      }
    };
    const tripListResolver: TripListResolver = new TripListResolver(tripServiceMock);
    tripListResolver.resolve(null, null).subscribe(trips => {
      expect(trips).toBe(tripsMock);
    });
  });
});
