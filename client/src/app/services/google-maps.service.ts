import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

declare var google: any;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Route {
  origin: LatLng;
  destination: LatLng;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  constructor() {}

  directions(origin: string, destination: string): Observable<any> {
    const request: any = { origin, destination, travelMode: 'DRIVING' };
    const directionsService = new google.maps.DirectionsService();
    return Observable.create(observer => {
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          const route: any = result.routes[0];
          const leg: any = route.legs[0];
          observer.next({
            origin: {
              lat: leg.start_location.lat(),
              lng: leg.start_location.lng()
            },
            destination: {
              lat: leg.end_location.lat(),
              lng: leg.end_location.lng()
            }
          });
        } else {
          observer.error('Enter two valid addresses.');
        }
        observer.complete();
      });
    });
  }
}
