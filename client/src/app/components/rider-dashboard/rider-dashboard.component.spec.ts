import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderDashboardComponent } from './rider-dashboard.component';

describe('RiderDashboardComponent', () => {
  let component: RiderDashboardComponent;
  let fixture: ComponentFixture<RiderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
