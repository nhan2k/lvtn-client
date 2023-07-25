import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { environment } from '@environment/environment.development';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  @Input() posts: Array<any> = [];
  @Input() title: string = '';
  @Input() totalItems: number = 0;
  @Input() isPagination: boolean = true;

  currentPage: number = 1;
  pageSize: number = 10;

  endpointURL: string = environment.imgUrl;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  onPageChange(event: PageEvent) {
    this.loadingService.setLoading(true);

    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Handle page change and update the displayed data accordingly
    this.router
      .navigate([''], {
        queryParams: {
          currentPage: this.currentPage,
        },
      })
      .then(() => this.loadingService.setLoading(false))
      .catch(() => this.loadingService.setLoading(false));
  }
}
