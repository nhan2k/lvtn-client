import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    const token = this.authService.getToken();
    // if (!token) {
    //   this.router.navigate(['/login']);
    // }
  }
}
