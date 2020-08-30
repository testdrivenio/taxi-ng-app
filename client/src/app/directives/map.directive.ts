import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { LatLng } from '../services/google-maps.service';

declare var google: any;

@Directive({
  selector: '[appMap]'
})
export class MapDirective implements OnChanges {
  @Input() origin: LatLng;
  @Input() destination: LatLng;

  constructor(private wrapper: GoogleMapsAPIWrapper) {}

  public updateMap(): void {
    this.wrapper.getNativeMap().then((map) => {
      const bounds = new google.maps.LatLngBounds();
      if (this.origin) {
        bounds.extend(new google.maps.LatLng(this.origin.lat, this.origin.lng));
      }
      if (this.destination) {
        bounds.extend(new google.maps.LatLng(this.destination.lat, this.destination.lng));
      }
      map.fitBounds(bounds);
      map.panToBounds(bounds);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.origin.currentValue) {
      this.updateMap();
    }
  }
}
