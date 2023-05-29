import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ITokens } from '@core/interfaces/shared/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      phoneNumber: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      fullName: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  onSubmit(): void {
    try {
      this.authService
        .register(this.registerForm.value)
        .subscribe((response) => {
          this.toastrService.success('Đăng ký thành công');
          this.router.navigate(['/login']);
        });
    } catch (error) {
      this.toastrService.error('Đăng ký thất bại');
      throw new Error((error as any).message);
    }
  }
}
