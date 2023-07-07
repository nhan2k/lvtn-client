import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadingService: LoadingService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userService.verifyEmail(params['id']).subscribe({
          next: (response) => {
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.loadingService.setLoading(false);
          },
        });
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }
}
