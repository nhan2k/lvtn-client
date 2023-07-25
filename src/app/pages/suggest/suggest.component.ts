import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnInit {
  postList: any[] = [];

  constructor(
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.postService.getALlSuggests().subscribe({
      next: (response) => {
        this.postList = response;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.toastrService.error(error || message);
        this.loadingService.setLoading(false);
      },
    });
  }
}
