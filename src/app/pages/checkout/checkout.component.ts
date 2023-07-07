import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPackage } from '@core/interfaces/checkout';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { UserService } from '@core/services/user.service';
import { packages } from '@core/values/checkout';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  packages: IPackage[] = packages;
  packChoose: IPackage | null = null;
  paymentChoose: boolean = false;
  email: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.packChoose = this.packages.filter(
          (pack) => pack.id == params['pack']
        )[0];
      },
      error: (err: any) => {},
    });
    this.email = this.authService.getEmail();
  }

  onChecked() {
    this.paymentChoose = true;
  }

  onClickPayment() {
    if (this.email && this.packChoose) {
      this.loadingService.setLoading(true);
      this.userService
        .createPayment({ coin: this.packChoose?.price })
        .subscribe({
          next: (response) => {
            this.toastrService.success(
              'Giao dịch thành công. Vui lòng kiểm tra mail hệ thống sẽ xác nhận thông tin trong thời gian sớm nhất'
            );
            this.router.navigate(['/coin'], {
              queryParams: { name: 'balance' },
            });
            this.loadingService.setLoading(false);
          },
          error: (err) => {
            this.toastrService.error(message);
            this.loadingService.setLoading(false);
          },
        });
    } else {
      this.toastrService.error(message);
    }
  }
}
