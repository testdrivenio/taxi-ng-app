import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

class UserData {
  constructor(
    public username: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public password: string = '',
    public group: string = '',
    public photo: any = '',
  ) {}
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user: UserData = new UserData();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.user.photo = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.authService.signUp(
      this.user.username,
      this.user.firstName,
      this.user.lastName,
      this.user.password,
      this.user.group,
      this.user.photo
    ).subscribe({
      complete: () => this.router.navigateByUrl('/log-in'),
      error: (error) => console.error(error),
    });
  }
}
