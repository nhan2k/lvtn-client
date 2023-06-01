import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
})
export class PostSearchComponent implements OnInit {
  postList: any[] = [];
  category: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe(
      (params) => {
        this.category = params['keyword'];
        this.postService.search(params['keyword']).subscribe(
          (data) => {
            this.postList = data;
            this.loadingService.setLoading(false);
          },
          (error) => {
            this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
            this.loadingService.setLoading(false);
          }
        );
      },
      (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      }
    );
  }
}
