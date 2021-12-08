import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrModule } from 'ngx-toastr';

import { TripService } from '../../services/trip.service';
import { createFakeTrip } from '../../testing/factories';
import { RiderRequestComponent } from './rider-request.component';

describe('RiderRequestComponent', () => {
  let component: RiderRequestComponent;
  let fixture: ComponentFixture<RiderRequestComponent>;
  let tripService: TripService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        GoogleMapsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ RiderRequestComponent ],
      providers: [ TripService ]
    });
    fixture = TestBed.createComponent(RiderRequestComponent);
    component = fixture.componentInstance;
    tripService = TestBed.inject(TripService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submit', () => {
    const spyCreateTrip = spyOn(tripService, 'createTrip');
    const spyNavigateByUrl = spyOn(router, 'navigateByUrl');
    component.trip = createFakeTrip();
    component.onSubmit();
    expect(spyCreateTrip).toHaveBeenCalledWith(component.trip);
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/rider');
  });
});
