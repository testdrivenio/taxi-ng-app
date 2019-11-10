import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  trips: Trip[];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  get currentTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  get requestedTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.status === 'REQUESTED';
    });
  }

  get completedTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {trips: Trip[]}) => this.trips = data.trips);
    this.tripService.connect();
    this.messages = this.tripService.messages.subscribe((message: any) => {
      const trip: Trip = Trip.create(message.data);
      this.updateTrips(trip);
    });
  }

  updateTrips(trip: Trip): void {
    this.trips = this.trips.filter(thisTrip => thisTrip.id !== trip.id);
    this.trips.push(trip);
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }
}
