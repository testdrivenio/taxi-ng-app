import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trip } from '../../services/trip.service';

@Component({
  selector: 'app-rider-detail',
  templateUrl: './rider-detail.component.html',
  styleUrls: ['./rider-detail.component.css']
})
export class RiderDetailComponent implements OnInit {
  trip!: Trip;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => this.trip = data['trip']);
  }
}
