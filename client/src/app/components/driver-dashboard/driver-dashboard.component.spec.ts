import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { Trip, TripService } from '../../services/trip.service';
import { createFakeTrip } from '../../testing/factories';
import { DriverDashboardComponent } from './driver-dashboard.component';

describe('DriverDashboardComponent', () => {
  let component: DriverDashboardComponent;
  let fixture: ComponentFixture<DriverDashboardComponent>;
  const trip1 = createFakeTrip({ driver: null });
  const trip2 = createFakeTrip({ status: 'COMPLETED' });
  const trip3 = createFakeTrip({ status: 'IN_PROGRESS' });

  @Component({
    selector: "app-trip-card",
    template: "",
  })
  class MockTripCardComponent {
    @Input() trips!: ReadonlyArray<Trip>;
  }

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trips: [trip1, trip2, trip3]
    });
  }

  class MockTripService {
    messages: Observable<any> = of();
    connect(): void {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot()
      ],
      declarations: [
        DriverDashboardComponent,
        MockTripCardComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: TripService, useClass: MockTripService }
      ]
    });
    fixture = TestBed.createComponent(DriverDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should get current trips', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.currentTrips).toEqual([trip3]);
    });
    component.ngOnInit();
  }));

  it('should get requested trips', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.requestedTrips).toEqual([trip1]);
    });
    component.ngOnInit();
  }));

  it('should get completed trips', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.completedTrips).toEqual([trip2]);
    });
    component.ngOnInit();
  }));
});
