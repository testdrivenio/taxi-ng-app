import { Component, Input } from '@angular/core';

import { User } from '../../services/auth.service';
import { Trip, otherUser } from '../../services/trip.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() title!: string;
  @Input() trips!: ReadonlyArray<Trip>;

  constructor() {}

  otherUser(trip: Trip): User | null {
    return otherUser(trip);
  }
}
