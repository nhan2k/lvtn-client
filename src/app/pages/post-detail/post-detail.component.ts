import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ChatService } from '@core/services/chat.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { message } from '@core/values/error.message';
import { environment } from '@environment/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id: string | null = null;
  post: any;
  email: string | null = null;
  endpointURL: string = environment.imgUrl;
  countSaw: number | null = null;

  objCategory: Object | any = {};
  Object = Object;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly chatService: ChatService
  ) {}
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.email = this.authService.getEmail();
    this.route.queryParams.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.postService.getOne(params['id']).subscribe({
          next: (data) => {
            this.post = data;
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (key.includes('PostId') && data[key]) {
                  this.objCategory = data[key];
                  if (data[key]?.address) {
                    (this.objCategory as any).address =
                      data[key]?.address?.address +
                      data[key]?.address?.district +
                      data[key]?.address?.province;
                  }
                }
              }
            }
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.toastrService.error(error || message);
            this.loadingService.setLoading(false);
          },
        });
        this.postService.countSaw(params['id']).subscribe({
          next: (response) => {
            console.log(
              '🚀 ~ file: post-detail.component.ts:65 ~ PostDetailComponent ~ this.postService.countSaw ~ response:',
              response
            );
            this.countSaw = response?.countSaw;
          },
          error: (error) => {},
        });
      },
      error: (error) => {
        this.toastrService.error(error || message);
        this.loadingService.setLoading(false);
      },
    });
  }

  onClickChat(postId: string, sellerId: string) {
    if (this.authService.getToken()) {
      this.loadingService.setLoading(true);
      this.chatService.createGroup({ postId, sellerId })?.subscribe({
        next: (response: any) => {
          if (response?._id) {
            this.router.navigate(['/chat'], {
              queryParams: { groupId: response?._id },
            });
            this.loadingService.setLoading(false);
          }
        },
        error: (error) => {
          this.toastrService.error(error || message);
          this.loadingService.setLoading(false);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
