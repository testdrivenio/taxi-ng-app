import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { TripFactory } from '../../testing/factories';
import { DriverDashboardComponent } from './driver-dashboard.component';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';

describe('DriverDashboardComponent', () => {
  let component: DriverDashboardComponent;
  let fixture: ComponentFixture<DriverDashboardComponent>;
  const trip1 = TripFactory.create({driver: null});
  const trip2 = TripFactory.create({status: 'COMPLETED'});
  const trip3 = TripFactory.create({status: 'IN_PROGRESS'});

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trips: [trip1, trip2, trip3]
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        DriverDashboardComponent,
        TripCardComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(DriverDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should get current trips', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.currentTrips).toEqual([trip3]);
    });
    component.ngOnInit();
  }));

  it('should get requested trips', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.requestedTrips).toEqual([trip1]);
    });
    component.ngOnInit();
  }));

  it('should get completed trips', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.completedTrips).toEqual([trip2]);
    });
    component.ngOnInit();
  }));
});
