import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { Trip, TripService, createTrip } from '../../services/trip.service';

@Component({
  selector: 'app-rider-dashboard',
  templateUrl: './rider-dashboard.component.html',
  styleUrls: ['./rider-dashboard.component.css']
})
export class RiderDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  trips: Trip[];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  get currentTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  get completedTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
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
    if (trip.status === 'STARTED') {
      this.toastr.info(`Driver ${trip.driver.username} is coming to pick you up.`);
    } else if (trip.status === 'IN_PROGRESS') {
      this.toastr.info(`Driver ${trip.driver.username} is headed to your destination.`);
    } else if (trip.status === 'COMPLETED') {
      this.toastr.info(`Driver ${trip.driver.username} has dropped you off.`);
    }
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }
}
