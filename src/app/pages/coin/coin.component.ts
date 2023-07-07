import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  name: string | null = null;
  wallet: { coin: number } | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.name = params['name'];
      },
      error: (err: any) => {},
    });

    this.userService.getWallet().subscribe({
      next: (resposne) => {
        this.wallet = resposne;
      },
      error: (err) => {},
    });
  }
}
