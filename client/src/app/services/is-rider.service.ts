import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsRider implements CanActivate {
  constructor() {}

  canActivate(): boolean {
    return AuthService.isRider();
  }
}
