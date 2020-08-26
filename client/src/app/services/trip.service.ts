import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, User, createUser } from './auth.service';

export interface Trip {
    id: string;
    created: string;
    updated: string;
    pick_up_address: string;
    drop_off_address: string;
    status: string;
    driver: User;
    rider: User;
}

export const createTrip = (data: any): Trip => {
  return {
    id: data.id,
    created: data.created,
    updated: data.updated,
    pick_up_address: data.pick_up_address,
    drop_off_address: data.drop_off_address,
    status: data.status,
    driver: data.driver ? createUser(data.driver) : null,
    rider: data.rider ? createUser(data.rider) : null
  };
};

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Trip[]>('/api/trip/', { headers }).pipe(
      map((trips: Trip[]) => trips.map((trip: Trip) => createTrip(trip)))
    );
  }
}
