import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ITokens } from '@core/interfaces/shared/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    phoneNumber: '',
    password: '',
  });

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService
  ) {}

  onSubmit(): void {
    const credentials = {
      phoneNumber: this.loginForm.value.phoneNumber || undefined,
      password: this.loginForm.value.password || undefined,
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        if (response.role !== 'user') {
          this.toastrService.error('Đăng nhập thất bại');
        } else {
          this.authService.storeToken(response as ITokens);
          this.router.navigate(['/']);
          this.toastrService.success('Đăng nhập thành công');
        }
      },
      (error) => {
        this.toastrService.error('Đăng nhập thất bại ' + error.error.message);
      }
    );
  }
}
