import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { message } from '@core/values/error.message';
import { environment } from '@environment/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  posts: any[] = [];
  endpointURL: string = environment.imgUrl;
  status: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.profile = response;
      },
      error: (error) => {
        this.toastrService.error(message);
        this.loadingService.setLoading(false);
      },
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        this.status = params['status'];
        this.postService.getAllBySeller(params['status']).subscribe({
          next: (data) => {
            this.posts = data;
            this.loadingService.setLoading(false);
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
}
