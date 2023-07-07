import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { message } from '@core/values/error.message';
import { environment } from '@environment/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.scss'],
})
export class PostManageComponent implements OnInit {
  status: string | null = null;
  posts: any[] = [];
  idChoose: string | null = null;
  packageChoose: number = 20000;
  dayChoose: number = 1;
  userId: string | null = null;

  endpointURL: string = environment.imgUrl;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.userId = this.authService.getId();
    this.route.queryParams.subscribe({
      next: (params) => {
        this.status = params['status'];
        this.postService
          .getAllBySeller(params['status'], this.userId)
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
      },
      error: (error) => {
        this.toastrService.error(message);
        this.loadingService.setLoading(false);
      },
    });
  }

  onClickChoosePackage(coin: number, day: number) {
    this.packageChoose = coin;
    this.dayChoose = day;
  }

  onClickAction(id: string) {
    this.idChoose = id;
  }

  onClickUpdateStatus(status: string): void {
    this.loadingService.setLoading(true);
    this.postService
      .update(this.idChoose, {
        status,
      })
      .subscribe({
        next: (response) => {
          this.loadingService.setLoading(false);
          this.posts = this.posts.filter((post) => post?._id !== response?._id);
          this.toastrService.success(
            `${status === 'show' ? 'Ẩn ' : 'Hiện'} tin thành công`
          );
        },
        error: (error) => {
          this.toastrService.error(message);
          this.loadingService.setLoading(false);
        },
      });
  }

  onClickSubmitPromoted() {
    if (this.idChoose) {
      this.loadingService.setLoading(true);
      this.postService
        .promote(this.idChoose, {
          coin: this.packageChoose,
          promotedEndDate: this.dayChoose,
        })
        .subscribe({
          next: (response) => {
            this.toastrService.success(`Thanh toán dịch vụ đẩy tin thành công`);
            this.posts = this.posts.map((post) => {
              if (post._id === response._id) {
                post.isPromoted = response?.isPromoted;
              }
            });
            this.loadingService.setLoading(false);
          },
          error: (err) => {
            this.toastrService.error(message);
            this.loadingService.setLoading(false);
          },
        });
    }
  }
}
