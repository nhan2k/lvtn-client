import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { UserService } from '@core/services/user.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  userId: string | undefined = undefined;
  opt: string | undefined = undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userId = params['userId'];
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onChangeOTP(target: any) {
    this.opt = target.value;
  }

  onClickSubmit() {
    this.loadingService.setLoading(true);
    console.log(
      '🚀 ~ file: verify-otp.component.ts:45 ~ VerifyOtpComponent ~ onClickSubmit ~ this.opt:',
      this.opt
    );
    console.log(
      '🚀 ~ file: verify-otp.component.ts:45 ~ VerifyOtpComponent ~ onClickSubmit ~ this.userId:',
      this.userId
    );
    if (!this.userId || !this.opt) {
      this.toastrService.error('Invalid');
      this.loadingService.setLoading(false);
    } else {
      this.userService.verifyPhoneNumber(this.userId, this.opt).subscribe({
        next: (response) => {
          if (response) {
            this.loadingService.setLoading(false);
            window.open(`http://localhost:4200`, '_blank');
          } else {
            this.toastrService.error('OTP không chính xác');
            this.loadingService.setLoading(false);
          }
        },
        error: (error) => {
          this.toastrService.error(error || message);
          this.loadingService.setLoading(false);
        },
      });
    }
  }
}
