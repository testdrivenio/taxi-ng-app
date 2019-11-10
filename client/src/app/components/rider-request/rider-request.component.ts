import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../services/auth.service';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent {
  trip: Trip = new Trip();

  constructor(
    private router: Router,
    private tripService: TripService
  ) {}

  onSubmit(): void {
    this.trip.rider = User.getUser();
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }
}
