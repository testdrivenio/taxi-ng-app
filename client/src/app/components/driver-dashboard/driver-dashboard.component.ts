import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrManager } from 'ng6-toastr-notifications';

import { Trip, TripService, createTrip } from '../../services/trip.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  trips: Trip[];

  constructor(
    private toastr: ToastrManager,
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  get currentTrips(): Trip[] {
    return this.trips.filter((trip: Trip) => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  get requestedTrips(): Trip[] {
    return this.trips.filter((trip: Trip) => trip.status === 'REQUESTED');
  }

  get completedTrips(): Trip[] {
    return this.trips.filter((trip: Trip) => trip.status === 'COMPLETED');
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { trips: Trip[] }) => this.trips = data.trips);
    this.tripService.connect();
    this.messages = this.tripService.messages.subscribe((message: any) => {
      const trip: Trip = createTrip(message.data);
      this.updateTrips(trip);
      this.updateToast(trip);
    });
  }

  updateTrips(trip: Trip): void {
    this.trips = this.trips.filter((thisTrip: Trip) => thisTrip.id !== trip.id);
    this.trips.push(trip);
  }

  updateToast(trip: Trip): void {
    if (trip.driver === null) {
      this.toastr.infoToastr(`Rider ${trip.rider.username} has requested a trip.`);
    }
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }
}
