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
import { message } from '@core/values/error.message';
import { ISelect } from '@core/interfaces/category';
import { ExternalApiService } from '@core/services/external-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  provinces: ISelect[] = [];
  province: string | null = null;
  districts: ISelect[] = [];

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly externalApiService: ExternalApiService,
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
      province: [null],
      district: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.externalApiService.getProvinces().subscribe({
      next: (response) => {
        this.provinces = response;
        this.loadingService.setLoading(false);
      },
      error: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.registerForm.valid) {
      this.loadingService.setLoading(true);
      const data = {
        ...this.registerForm.value,
        address: {
          province: this.province,
          district: this.registerForm.value.district,
          address: this.registerForm.value.address,
        },
      };

      this.authService.register(data).subscribe({
        next: (response) => {
          this.toastrService.success('Đăng ký thành công');
          this.router.navigate(['/login']);
          this.registerForm.reset();
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(message);
          this.loadingService.setLoading(false);
        },
      });
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

  onProvincesChange($event: Event) {
    this.loadingService.setLoading(true);
    this.province = this.provinces.filter(
      (element) => element.value === ($event.target as any).value
    )[0].label;
    this.externalApiService
      .getDistricts(($event.target as any).value)
      .subscribe({
        next: (response) => {
          this.districts = response;
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.loadingService.setLoading(false);
        },
      });
  }
}
