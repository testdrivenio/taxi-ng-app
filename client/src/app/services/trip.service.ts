import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './auth.service';

export class Trip {
  constructor(
    public id?: string,
    public created?: string,
    public updated?: string,
    public pick_up_address?: string,
    public drop_off_address?: string,
    public status?: string,
    public driver?: any,
    public rider?: any
  ) {}

  static create(data: any): Trip {
    return new Trip(
      data.id,
      data.created,
      data.updated,
      data.pick_up_address,
      data.drop_off_address,
      data.status,
      data.driver ? User.create(data.driver) : null,
      User.create(data.rider)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(
    private http: HttpClient
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>('/api/trip/').pipe(
      map(trips => trips.map(trip => Trip.create(trip)))
    );
  }
}
