import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GoogleMapsService, LatLng, Route } from '../../services/google-maps.service';

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
  markers: Marker[];
  origin: LatLng;
  destination: LatLng;

  constructor(
    private router: Router,
    private googleMapsService: GoogleMapsService,
    private toastr: ToastrService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.origin = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.markers = [this.origin];
      });
    }
  }

  onSubmit(): void {
    this.trip.rider = AuthService.getUser();
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }

  onUpdate(): void {
    const { pick_up_address, drop_off_address } = this.trip;
    if (pick_up_address && drop_off_address) {
      this.toastr.info('Updating map...');
      this.googleMapsService.directions(
        pick_up_address, drop_off_address
      ).subscribe((route: Route) => {
        this.origin = route.origin;
        this.destination = route.destination;
        this.markers = [
          {
            lat: route.origin.lat,
            lng: route.origin.lng,
            label: 'A'
          },
          {
            lat: route.destination.lat,
            lng: route.destination.lng,
            label: 'B'
          }
        ];
      });
    }
  }
}
