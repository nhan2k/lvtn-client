import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ISelect } from '@core/interfaces/category';
import { AuthService } from '@core/services/auth.service';
import { ExternalApiService } from '@core/services/external-api.service';
import { LoadingService } from '@core/services/loading.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  editForm: FormGroup;
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
    this.editForm = this.formBuilder.group({
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
        [this.phoneNumberValidator()],
      ],
      email: [null, [Validators.required, Validators.email]],
      fullName: [null, [Validators.required, Validators.minLength(4)]],
      province: [null],
      district: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.externalApiService.getProvinces().subscribe({
      next: (response) => {
        this.provinces = response;
        this.loadingService.setLoading(false);
      },
      error: () => {
        this.loadingService.setLoading(false);
      },
    });
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.editForm.setValue({
          email: response?.email,
          fullName: response?.fullName,
          phoneNumber: response?.phoneNumber,
          province: response?.address?.province,
          district: response?.address?.district,
          address: response?.address?.address,
        });
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.editForm.valid) {
      this.loadingService.setLoading(true);
      const data = {
        ...this.editForm.value,
        address: {
          province: this.province,
          district: this.editForm.value.district,
          address: this.editForm.value.address,
        },
      };

      this.authService.updateProfile(data).subscribe({
        next: (response) => {
          this.toastrService.success('Cập nhật thành công');
          this.router.navigate(['/']);
          this.editForm.reset();
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
