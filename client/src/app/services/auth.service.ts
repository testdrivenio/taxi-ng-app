import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  readonly id: string;
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly group: string;
  readonly photo: string;
}

export interface Token {
  readonly access: string;
  readonly refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private static parseUserFromAccessToken(accessToken: string): User {
    const [, payload, ] = accessToken.split('.');
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  static getUser(): User | undefined {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.parseUserFromAccessToken(accessToken);
    }
    return undefined;
  }

  static getAccessToken(): string | undefined {
    const item = window.localStorage.getItem('taxi.auth');
    if (!item) {
      return undefined;
    }
    const token = JSON.parse(item);
    if (token) {
      return token.access;
    }
    return undefined;
  }

  static isRider(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'rider';
    }
    return false;
  }

  static isDriver(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'driver';
    }
    return false;
  }

  signUp(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    group: string,
    photo: any
  ): Observable<User> {
    const url = '/api/sign_up/';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password1', password);
    formData.append('password2', password);
    formData.append('group', group);
    formData.append('photo', photo);
    return this.http.request<User>('POST', url, { body: formData });
  }

  logIn(username: string, password: string): Observable<Token> {
    const url = '/api/log_in/';
    return this.http.post<Token>(url, { username, password }).pipe(
      tap(token => localStorage.setItem('taxi.auth', JSON.stringify(token)))
    );
  }

  logOut(): void {
    localStorage.removeItem('taxi.auth');
  }
}
