import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { Trip, TripService } from './trip.service';

@Injectable({
  providedIn: 'root'
})
export class TripListResolver implements Resolve<ReadonlyArray<Trip>> {
  constructor(private tripService: TripService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ReadonlyArray<Trip>> {
    return this.tripService.getTrips();
  }
}
