import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
})
export class PostSearchComponent implements OnInit, OnDestroy {
  postList: any[] = [];
  category: string = '';
  private routeSub: Subscription = new Subscription();
  params: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.routeSub = this.route.queryParams.subscribe({
      next: (params) => {
        this.params = params;
        this.category = params['keyword'];
        this.postService.search(params).subscribe({
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
  }
  ngOnDestroy(): void {
    this.loadingService.setLoading(true);
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    } else {
      this.loadingService.setLoading(false);
    }
  }
}
