import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { environment } from '@environment/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postList: any[] = [];
  endpointURL: string = environment.imgUrl;

  constructor(
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.postService.getAll({}).subscribe((response) => {
      this.postList = response;
      this.loadingService.setLoading(false);
    });
  }
}
