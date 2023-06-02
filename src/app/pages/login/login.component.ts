import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ITokens } from '@core/interfaces/shared/auth';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@core/services/loading.service';

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
    private readonly toastrService: ToastrService,
    private readonly loadingService: LoadingService
  ) {}

  onSubmit(): void {
    const credentials = {
      phoneNumber: this.loginForm.value.phoneNumber || undefined,
      password: this.loginForm.value.password || undefined,
    };
    this.loadingService.setLoading(true);
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.role !== 'user') {
          this.toastrService.error('Đăng nhập thất bại');
          this.loadingService.setLoading(false);
        } else {
          this.authService.storeToken(response as ITokens);
          this.router.navigate(['/']);
          this.toastrService.success('Đăng nhập thành công');
          this.loadingService.setLoading(false);
        }
      },
      error: (error) => {
        this.toastrService.error('Đăng nhập thất bại ' + error.error.message);
        this.loadingService.setLoading(false);
      },
    });
  }
}
