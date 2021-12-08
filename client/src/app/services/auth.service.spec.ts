import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { createFakeToken, createFakeUser } from '../testing/factories';

describe('Authentication using a service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should allow a user to sign up for a new account', () => {
    // Set up the data.
    const userData = createFakeUser();
    const photo = new File(['photo'], userData.photo, { type: 'image/jpeg' });

    // Execute the function under test.
    authService.signUp(
      userData.username,
      userData.first_name,
      userData.last_name,
      'pAssw0rd!',
      userData.group,
      photo
    ).subscribe(user => {
      expect(user).toBe(userData);
    });

    const request = httpMock.expectOne('/api/sign_up/');
    request.flush(userData);
  });

  it('should allow a user to log in to an existing account', () => {
    // Set up the data.
    const userData = createFakeUser();
    const tokenData = createFakeToken(userData);

    // A successful login should write data to local storage.
    localStorage.clear();

    // Execute the function under test.
    authService.logIn(
      userData.username, 'pAssw0rd!'
    ).subscribe(user => {
      expect(user).toBe(tokenData);
    });
    const request = httpMock.expectOne('/api/log_in/');
    request.flush(tokenData);

    // Confirm that the expected data was written to local storage.
    expect(localStorage.getItem('taxi.auth')).toBe(JSON.stringify(tokenData));
  });

  it('should allow a user to log out', () => {
    // Set up the data.
    const tokenData = {};

    // A successful logout should delete local storage data.
    localStorage.setItem('taxi.auth', JSON.stringify(tokenData));

    // Execute the function under test.
    authService.logOut();

    // Confirm that the local storage data was deleted.
    expect(localStorage.getItem('taxi.auth')).toBeNull();
  });

  it('should determine whether a user is logged in', () => {
    localStorage.clear();
    expect(AuthService.getUser()).toBeFalsy();

    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser())
    ));
    expect(AuthService.getUser()).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
