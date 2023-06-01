import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly loadingService: LoadingService
  ) {
    this.registerForm = this.formBuilder.group({
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
        [this.phoneNumberValidator()],
      ],
      password: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      fullName: [null, [Validators.required, Validators.minLength(4)]],
      address: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.registerForm.valid) {
      this.loadingService.setLoading(true);
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.toastrService.success('Đăng ký thành công');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );
    } else {
      this.errorMessage = 'Thông tin không hợp lệ vui lòng kiểm tra lại';
    }
  }

  phoneNumberValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const phoneNumber = control.value;
      const pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      const isValid = pattern.test(phoneNumber);
      return of(isValid ? null : { phoneNumberInvalid: true }).pipe(
        map((result) => (result ? { phoneNumberInvalid: true } : null))
      );
    };
  }
}
