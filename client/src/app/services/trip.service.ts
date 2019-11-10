import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { map, share } from 'rxjs/operators';

import { User } from './auth.service';

export class Trip {
  public otherUser: User;

  constructor(
    public id?: string,
    public created?: string,
    public updated?: string,
    public pick_up_address?: string,
    public drop_off_address?: string,
    public status?: string,
    public driver?: any,
    public rider?: any
  ) {
    this.otherUser = User.isRider() ? this.driver : this.rider;
  }

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

  webSocket: WebSocketSubject<any>;
  messages: Observable<any>;

  constructor(
    private http: HttpClient
  ) {}

  connect(): void {
    if (!this.webSocket || this.webSocket.closed) {
      this.webSocket = webSocket('ws://localhost:8080/taxi/');
      this.messages = this.webSocket.pipe(share());
      this.messages.subscribe(message => console.log(message));
    }
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>('/api/trip/').pipe(
      map(trips => trips.map(trip => Trip.create(trip)))
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
    return this.http.get<Trip>(`/api/trip/${id}/`).pipe(
      map(trip => Trip.create(trip))
    );
  }
}
