import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ChatService } from '@core/services/chat.service';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly chatService:ChatService
  ) {}
  ngOnInit(): void {
    this.email = this.authService.getEmail();

    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.postService.getOne(params['id']).subscribe((data) => {
        this.post = data;
      });
    });
  }

  onClickApproved() {
    this.loadingService.setLoading(true);
    const data = {
      isReview: true,
      status: 'show',
    };
    this.postService.approved(this.id, data).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.toastrService.success('Duyệt tin thành công');
    });
  }

  onClickChat(userId: string) {
    if (this.authService.getToken()) {
      this.loadingService.setLoading(true);
      this.chatService.createGroup(userId)?.subscribe((response:any) => {
        console.log("🚀 ~ file: post-detail.component.ts:55 ~ PostDetailComponent ~ this.chatService.createGroup ~ response:", response)
        
        this.router.navigate(['/chat']);
      this.loadingService.setLoading(false);
    })
    } else {
      this.router.navigate(['/login']);
    }
  }
}
