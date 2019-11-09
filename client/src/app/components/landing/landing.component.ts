import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private authService: AuthService) {}
  getUser(): User {
    return User.getUser();
  }
  isRider(): boolean {
    return User.isRider();
  }
  logOut(): void {
    this.authService.logOut().subscribe(() => {}, (error) => {
      console.error(error);
    });
  }
}
