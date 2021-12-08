import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './services/auth.service';
import { IsDriver } from './services/is-driver.service';
import { IsRider } from './services/is-rider.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RiderComponent } from './components/rider/rider.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { TripDetailResolver } from './services/trip-detail.resolver';
import { TripListResolver } from './services/trip-list.resolver';
import { TripService } from './services/trip.service';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { DriverComponent } from './components/driver/driver.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    RiderComponent,
    SignUpComponent,
    RiderDashboardComponent,
    RiderRequestComponent,
    RiderDetailComponent,
    TripCardComponent,
    DriverComponent,
    DriverDashboardComponent,
    DriverDetailComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    IsDriver,
    IsRider,
    TripDetailResolver,
    TripListResolver,
    TripService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
