import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../services/auth.service';
import { TripService, WritableTripData } from '../../services/trip.service';

const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';
// Coordinates of Washington, DC, USA
const INITIAL_LAT = 38.89511;
const INITIAL_LNG = -77.03637;

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  directions!: Observable<google.maps.DirectionsResult | null>;
  origin: google.maps.LatLngLiteral = {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG
  };
  trip: WritableTripData = {
    pick_up_address: '',
    drop_off_address: '',
    status: 'REQUESTED',
    driver: null,
    rider: null
  };

  constructor(
    private client: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private tripService: TripService
  ) {
    this.apiLoaded = client
      .jsonp(`${GOOGLE_MAPS_API_URL}?key=${environment.GOOGLE_API_KEY}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }

  onUpdate(): void {
    const { pick_up_address, drop_off_address } = this.trip;
    if (pick_up_address && drop_off_address) {
      this.toastr.info('Updating map...');
      this.directions = this.getDirections(pick_up_address, drop_off_address);
    }
  }

  onSubmit(): void {
    this.trip.rider = AuthService.getUser()!;
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }

  getDirections(pickUpAddress: string, dropOffAddress: string): Observable<google.maps.DirectionsResult | null> {
    const request: google.maps.DirectionsRequest = {
      origin: pickUpAddress,
      destination: dropOffAddress,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    const directionsService = new google.maps.DirectionsService();
    return new Observable(observer => {
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          observer.next(result);
        } else {
          observer.error('Enter two valid addresses.');
        }
        observer.complete();
      });
    });
  }
}
