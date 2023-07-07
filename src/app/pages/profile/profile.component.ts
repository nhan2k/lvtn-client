import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { UserService } from '@core/services/user.service';
import { message } from '@core/values/error.message';
import { environment } from '@environment/environment.development';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profile: any;
  posts: any[] = [];
  endpointURL: string = environment.imgUrl;
  status: string | null = null;
  isSelled: boolean = false;
  rating: any;
  userId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);

    this.route.queryParams.subscribe({
      next: (params) => {
        this.status = params['status'];
        this.isSelled = params['isSelled'];
        this.userId = params['userId'];

        this.postService
          .getAllBySeller(
            params['status'],
            params['userId'],
            params['isSelled']
          )
          .subscribe({
            next: (data) => {
              this.posts = data;
              this.loadingService.setLoading(false);
            },
            error: (error) => {
              this.toastrService.error(message);
              this.loadingService.setLoading(false);
            },
          });

        this.authService.getTargetUserProfile(params['userId']).subscribe({
          next: (response) => {
            this.profile = response;
          },
          error: (error) => {
            this.toastrService.error(message);
            this.loadingService.setLoading(false);
          },
        });

        this.userService.getRatingAvg(params['userId']).subscribe({
          next: (response) => {
            this.rating = response;
          },
          error: (error) => {
            this.toastrService.error(message);
            this.loadingService.setLoading(false);
          },
        });
      },
      error: (error) => {
        this.toastrService.error(message);
        this.loadingService.setLoading(false);
      },
    });
  }

  ngAfterViewInit(): void {
    // Initialize tooltips after the view has been initialized
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl: any) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  verifyEmail(userId: string) {
    this.loadingService.setLoading(true);
    if (userId) {
      this.userService.verifySendEmail().subscribe({
        next: (response) => {
          this.toastrService.success(
            'Hệ thống đã gửi xác thực đến email của bạn'
          );
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(message);
          this.loadingService.setLoading(false);
        },
      });
    }
  }
}
