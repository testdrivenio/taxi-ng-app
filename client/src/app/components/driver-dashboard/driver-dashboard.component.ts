import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trip } from '../../services/trip.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  trips: Trip[];

  constructor(private route: ActivatedRoute) {}

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
    this.route.data
      .subscribe((data: {trips: Trip[]}) => this.trips = data.trips);
  }
}
