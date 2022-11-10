import { ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Trip } from './trip.service';
import { TripListResolver } from './trip-list.resolver';
import { createFakeTrip } from '../testing/factories';

describe('TripListResolver', () => {
  const routerStateSnapshotMock = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

  it('should resolve a list of trips', () => {
    const tripsMock = [
      createFakeTrip(),
      createFakeTrip()
    ];
    const tripServiceMock: any = {
      getTrips: (): Observable<ReadonlyArray<Trip>> => {
        return of(tripsMock);
      }
    };
    const tripListResolver: TripListResolver = new TripListResolver(tripServiceMock);
    tripListResolver.resolve(new ActivatedRouteSnapshot(), routerStateSnapshotMock).subscribe(trips => {
      expect(trips).toBe(tripsMock);
    });
  });
});
