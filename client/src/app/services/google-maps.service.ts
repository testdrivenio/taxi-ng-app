import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  constructor() {}

  directions(
    pickUpAddress: string,
    dropOffAddress: string
  ): Observable<any> {
    const request: any = {
      origin: pickUpAddress,
      destination: dropOffAddress,
      travelMode: 'DRIVING'
    };
    const directionsService = new google.maps.DirectionsService();
    return Observable.create(observer => {
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
