import { ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Trip } from './trip.service';
import { TripDetailResolver } from './trip-detail.resolver';
import { createFakeTrip } from '../testing/factories';

describe('TripDetailResolver', () => {
  it('should resolve a trip', () => {
    const tripMock: Trip = createFakeTrip();
    const tripServiceMock: any = {
      getTrip: (id: string): Observable<Trip> => {
        return new Observable<Trip>(observer => {
          observer.next(tripMock);
          observer.complete();
        });
      }
    };
    const tripDetailResolver: TripDetailResolver = new TripDetailResolver(tripServiceMock);
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    route.params = {id: tripMock.id};
    const routerStateSnapshotMock = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);
    tripDetailResolver.resolve(route, routerStateSnapshotMock).subscribe(trip => {
      expect(trip).toBe(tripMock);
    });
  });
});
