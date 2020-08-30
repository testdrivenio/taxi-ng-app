import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { TripService } from '../../services/trip.service';
import { createFakeTrip } from '../../testing/factories';
import { DriverDetailComponent } from './driver-detail.component';

describe('DriverDetailComponent', () => {
  let component: DriverDetailComponent;
  let fixture: ComponentFixture<DriverDetailComponent>;
  let tripService: TripService;
  const trip = createFakeTrip();

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trip
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ DriverDetailComponent ],
      providers: [
        TripService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(DriverDetailComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);
  });

  it('should update data on initialization', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip).toEqual(trip);
    });
    component.ngOnInit();
  }));

  it('should update trip status', () => {
    const spyUpdateTrip = spyOn(tripService, 'updateTrip');
    component.trip = createFakeTrip();
    component.updateTripStatus('STARTED');
    expect(spyUpdateTrip).toHaveBeenCalledWith(component.trip);
  });
});
