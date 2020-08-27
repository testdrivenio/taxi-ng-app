import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ng6-toastr-notifications';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { GoogleMapsService } from './services/google-maps.service';
import { IsDriver } from './services/is-driver.service';
import { IsRider } from './services/is-rider.service';
import { TripDetailResolver } from './services/trip-detail.resolver';
import { TripListResolver } from './services/trip-list.resolver';
import { TripService } from './services/trip.service';

import { AppComponent } from './app.component';
import { DriverComponent } from './components/driver/driver.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    LandingComponent,
    LogInComponent,
    RiderComponent,
    RiderDashboardComponent,
    RiderDetailComponent,
    RiderRequestComponent,
    SignUpComponent,
    TripCardComponent,
    DriverDashboardComponent,
    DriverDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    GoogleMapsService,
    IsDriver,
    IsRider,
    TripService,
    TripListResolver,
    TripDetailResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
