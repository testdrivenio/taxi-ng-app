import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit, OnDestroy {
  messages!: Subscription;
  trips!: Array<Trip>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private tripService: TripService
  ) {}

  get currentTrips(): ReadonlyArray<Trip> {
    return this.trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  get requestedTrips(): ReadonlyArray<Trip> {
    return this.trips.filter(trip => trip.status === 'REQUESTED');
  }

  get completedTrips(): ReadonlyArray<Trip> {
    return this.trips.filter(trip => trip.status === 'COMPLETED');
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.trips = data['trips']);
    this.tripService.connect();
    this.messages = this.tripService.messages.subscribe((message: any) => {
      const trip: Trip = message.data;
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
      this.toastr.info(`Rider ${trip.rider!.username} has requested a trip.`);
    }
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }
}
