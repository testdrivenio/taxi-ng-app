import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsDriver } from './services/is-driver.service';
import { IsRider } from './services/is-rider.service';
import { TripDetailResolver } from './services/trip-detail.resolver';
import { TripListResolver } from './services/trip-list.resolver';

import { DriverComponent } from './components/driver/driver.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
  {
    path: 'rider',
    component: RiderComponent,
    canActivate: [
      IsRider
    ],
    children: [
      {
        path: 'request',
        component: RiderRequestComponent
      },
      {
        path: ':id',
        component: RiderDetailComponent,
        resolve: { trip: TripDetailResolver }
      },
      {
        path: '',
        component: RiderDashboardComponent,
        resolve: { trips: TripListResolver }
      }
    ]
  },
  {
    path: 'driver',
    component: DriverComponent,
    canActivate: [
      IsDriver
    ],
    children: [
      {
        path: '',
        component: DriverDashboardComponent,
        resolve: { trips: TripListResolver }
      },
      {
        path: ':id',
        component: DriverDetailComponent,
        resolve: { trip: TripDetailResolver }
      }
    ]
  },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
