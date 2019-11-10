import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../services/auth.service';
import { GoogleMapsService } from '../../services/google-maps.service';
import { Trip, TripService } from '../../services/trip.service';

class Marker {
  constructor(
    public lat: number,
    public lng: number,
    public label?: string
  ) {}
}

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent implements OnInit {
  trip: Trip = new Trip();
  lat = 0;
  lng = 0;
  zoom = 13;
  markers: Marker[];

  constructor(
    private googleMapsService: GoogleMapsService,
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.markers = [
          new Marker(this.lat, this.lng)
        ];
      });
    }
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

  onSubmit(): void {
    this.trip.rider = User.getUser();
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }
}
