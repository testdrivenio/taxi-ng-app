import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleMapsService } from '../../services/google-maps.service';

import { AuthService } from '../../services/auth.service';
import { Trip, TripService, createTrip } from '../../services/trip.service';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
}

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent implements OnInit {
  trip: Trip = createTrip({});
  lat = 0;
  lng = 0;
  zoom = 13;
  markers: Marker[];

  constructor(
    private router: Router,
    private googleMapsService: GoogleMapsService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.markers = [
          { lat: this.lat, lng: this.lng }
        ];
      });
    }
  }

  onSubmit(): void {
    this.trip.rider = AuthService.getUser();
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }

  onUpdate(): void {
    if (
      !!this.trip.pick_up_address &&
      !!this.trip.drop_off_address
    ) {
      this.googleMapsService.directions(
        this.trip.pick_up_address,
        this.trip.drop_off_address
      ).subscribe((data: any) => {
        const route: any = data.routes[0];
        const leg: any = route.legs[0];
        this.lat = leg.start_location.lat();
        this.lng = leg.start_location.lng();
        this.markers = [
          {
            lat: leg.start_location.lat(),
            lng: leg.start_location.lng(),
            label: 'A'
          },
          {
            lat: leg.end_location.lat(),
            lng: leg.end_location.lng(),
            label: 'B'
          }
        ];
      });
    }
  }
}
