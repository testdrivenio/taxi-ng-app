import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { IsRider } from './services/is-rider.service';
import { TripListResolver } from './services/trip-list.resolver';
import { TripService } from './services/trip.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RiderComponent } from './components/rider/rider.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    RiderComponent,
    SignUpComponent,
    RiderDashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    IsRider,
    TripListResolver,
    TripService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
