import { Component, Input } from '@angular/core';

import { Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() title: string;
  @Input() trips: Trip[];

  constructor() {}
}
