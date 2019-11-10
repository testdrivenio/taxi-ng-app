import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Trip, TripService } from '../services/trip.service';

@Injectable({
  providedIn: 'root'
})
export class TripDetailResolver implements Resolve<Trip> {
  constructor(private tripService: TripService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trip> {
    return this.tripService.getTrip(route.params.id);
  }
}
