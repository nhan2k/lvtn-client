import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { UserService } from '@core/services/user.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
})
export class PostCategoryComponent implements OnInit, AfterViewInit {
  postList: any[] = [];
  category: string = '';
  params: any;
  profile: any;
  isSuggested: boolean = false;
  isAuth: boolean = this.authService.getToken() !== null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
  ngAfterViewInit(): void {
    // Initialize tooltips after the view has been initialized
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl: any) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe({
      next: (params) => {
        this.params = params;
        this.category = params['name'];
        this.postService.getAll(params).subscribe({
          next: (data) => {
            this.postList = data;
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.toastrService.error(error || message);
            this.loadingService.setLoading(false);
          },
        });
      },
      error: (error) => {
        this.toastrService.error(error || message);
        this.loadingService.setLoading(false);
      },
    });

    if (this.isAuth) {
      this.authService.getProfile().subscribe({
        next: (response) => {
          this.profile = response;
          this.isSuggested = (this.profile?.suggests as Array<string>).includes(
            this.category
          );
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(error || message);
          this.loadingService.setLoading(false);
        },
      });
    }
  }

  onClickSuggest(isSuggested: boolean) {
    this.loadingService.setLoading(true);
    const categoryName = this.category;
    this.userService
      .createOrUpdateSuggest({ categoryName }, isSuggested)
      .subscribe({
        next: (response) => {
          if (isSuggested) {
            this.toastrService.success('Đăng ký gợi ý tin thành công');
          } else {
            this.toastrService.success('Hủy đăng ký gợi ý tin thành công');
          }
          this.isSuggested = isSuggested;
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(error || message);
          this.loadingService.setLoading(false);
        },
      });
  }
}
