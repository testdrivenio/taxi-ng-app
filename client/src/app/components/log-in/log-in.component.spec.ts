import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../services/auth.service';
import { createFakeToken, createFakeUser } from '../../testing/factories';
import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        LogInComponent
      ],
      providers: [
        AuthService
      ]
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should allow a user to log into an existing account', () => {
    const spy = spyOn(router, 'navigateByUrl');
    const user = createFakeUser();
    const token = createFakeToken(user);
    component.user = { username: user.username, password: 'pAssw0rd!' };
    component.onSubmit();
    const request = httpMock.expectOne('/api/log_in/');
    request.flush(token);
    expect(localStorage.getItem('taxi.auth')).toEqual(JSON.stringify(token));
    expect(spy).toHaveBeenCalledWith('');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
