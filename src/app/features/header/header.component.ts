import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggined = false;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    if (this.authService.getToken()) {
      console.log(
        '🚀 ~ file: header.component.ts:19 ~ HeaderComponent ~ ngOnInit ~ this.authService.getToken():',
        this.authService.getToken()
      );
      this.isLoggined = true;
    }
  }

  onClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onClickPost() {
    if (this.authService.getToken()) {
      this.router.navigate(['/post-create']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
