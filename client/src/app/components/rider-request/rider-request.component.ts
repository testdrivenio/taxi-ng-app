import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { GoogleMapsService } from '../../services/google-maps.service';
import { AuthService } from '../../services/auth.service';
import { Trip, TripService, createTrip } from '../../services/trip.service';

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent implements OnChanges, OnInit {
  apiLoaded: Observable<boolean>;
  trip: Trip = createTrip({});
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  directions: Observable<google.maps.DirectionsResult | undefined>;

  @ViewChild(GoogleMap)
  map: GoogleMap;

  constructor(
    private googleMapsService: GoogleMapsService,
    private router: Router,
    private toastr: ToastrService,
    private tripService: TripService
  ) {
    this.apiLoaded = googleMapsService.apiLoaded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.origin.currentValue) {
      this.updateMap();
    }
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.origin = { lat: position.coords.latitude, lng: position.coords.longitude };
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
      this.directions = this.googleMapsService.directions(
        pick_up_address, drop_off_address
      );
    }
  }

  updateMap(): void {
    const bounds = new google.maps.LatLngBounds();
    if (this.origin) {
      bounds.extend(new google.maps.LatLng(this.origin.lat, this.origin.lng));
    }
    if (this.destination) {
      bounds.extend(new google.maps.LatLng(this.destination.lat, this.destination.lng));
    }
    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);
  }
}
