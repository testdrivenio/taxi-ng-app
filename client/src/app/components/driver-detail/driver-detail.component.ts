import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {
  trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { trip: Trip }) => this.trip = data.trip);
  }

  updateTripStatus(status: string): void {
    this.trip.driver = AuthService.getUser();
    this.trip.status = status;
    this.tripService.updateTrip(this.trip);
  }
}
