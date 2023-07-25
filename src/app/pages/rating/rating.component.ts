import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { message } from '@core/values/error.message';
import { ToastrService } from 'ngx-toastr';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '@core/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  imports: [NgbRatingModule, CommonModule],
  standalone: true,
})
export class RatingComponent implements OnInit {
  currentRate: number = 0; // Maximum number of stars
  comment: string = '';
  userId: string = '';
  postId?: string;
  ratings: any[] = [];
  userTargetId: string = '';
  userTarget: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userId = params['userId'];
        this.postId = params['postId'];
        this.userTargetId = params['userTargetId'];
        this.userService.getAllRatings(this.userId).subscribe({
          next: (response) => {
            this.ratings = response;
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

    this.authService.getTargetUserProfile(this.userId).subscribe({
      next: (response) => {
        this.userTarget = response;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.toastrService.error(error || message);
        this.loadingService.setLoading(false);
      },
    });
  }

  onChangeComment(target: any) {
    this.comment = target.value;
  }

  onSubmitComment() {
    this.loadingService.setLoading(true);
    this.userService
      .rating(
        this.userId,
        this.userTargetId,
        this.currentRate,
        this.comment,
        this.postId
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/rating'], {
            queryParams: { userId: this.userTargetId },
          });
          this.toastrService.success('Đánh giá thành công');
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(error || message);
          this.loadingService.setLoading(false);
        },
      });
  }
}
