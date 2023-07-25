import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent {
  @Input() amount: string = '0';

  public payPalConfig?: IPayPalConfig;

  @Output() callParentFunctionEvent = new EventEmitter<void>();

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'Af_BHjTJtHx7zdqPDuKQXVhv4o2MwsnijWz60FD-tR-YcMyNZc9nTkdEfUn3l_Sd5QqksUCHUAZ1vDG4',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.amount,
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          this.callParentFunctionEvent.emit();
          this.loadingService.setLoading(false);
          this.router.navigate(['/']).then(() => window.location.reload());
        });
      },
    };
  }
}
