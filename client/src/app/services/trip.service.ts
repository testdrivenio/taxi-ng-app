import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { map, share } from 'rxjs/operators';

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
  otherUser: User;
}

export const createTrip = (data: any): Trip => {
  const driver = data.driver ? createUser(data.driver) : null;
  const rider = data.rider ? createUser(data.rider) : null;
  const otherUser = AuthService.isRider() ? driver : rider;
  return {
    id: data.id,
    created: data.created,
    updated: data.updated,
    pick_up_address: data.pick_up_address,
    drop_off_address: data.drop_off_address,
    status: data.status,
    driver,
    rider,
    otherUser
  };
};

@Injectable({
  providedIn: 'root'
})
export class TripService {
  webSocket: WebSocketSubject<any>;
  messages: Observable<any>;

  constructor(private http: HttpClient) {}

  connect(): void {
    if (!this.webSocket || this.webSocket.closed) {
      const accessToken = AuthService.getAccessToken();
      this.webSocket = webSocket(`ws://localhost:8080/taxi/?token=${accessToken}`);
      this.messages = this.webSocket.pipe(share());
      this.messages.subscribe(message => console.log(message));
    }
  }

  getTrips(): Observable<Trip[]> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Trip[]>('/api/trip/', { headers }).pipe(
      map((trips: Trip[]) => trips.map((trip: Trip) => createTrip(trip)))
    );
  }

  createTrip(trip: Trip): void {
    this.connect();
    const message: any = {
      type: 'create.trip',
      data: {
        ...trip, rider: trip.rider.id
      }
    };
    this.webSocket.next(message);
  }

  getTrip(id: string): Observable<Trip> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Trip>(`/api/trip/${id}/`, { headers }).pipe(
      map((trip: Trip) => createTrip(trip))
    );
  }

  updateTrip(trip: Trip): void {
    this.connect();
    const message: any = {
      type: 'update.trip',
      data: {
        ...trip, driver: trip.driver.id, rider: trip.rider.id
      }
    };
    this.webSocket.next(message);
  }
}
