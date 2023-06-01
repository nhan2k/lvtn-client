import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ChatService } from '@core/services/chat.service';
import { LoadingService } from '@core/services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggined = false;
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly chatService: ChatService,
    private readonly toastrService: ToastrService
  ) {
    this.myForm = this.formBuilder.group({
      keyword: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggined = true;
    }
  }

  onClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onClickPost() {
    if (this.authService.getToken()) {
      this.router.navigate(['/post-create']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onClickChat() {
    if (this.authService.getToken()) {
      this.loadingService.setLoading(true);
      this.chatService.getAllGroup().subscribe(
        (response: any) => {
          this.router.navigate(['/chat'], {
            queryParams: { groupId: response?.[0]?._id },
          });
          this.loadingService.setLoading(false);
        },
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  onClickSearch() {
    if (this.myForm.valid) {
      this.loadingService.setLoading(true);
      this.router
        .navigate(['/posts'], {
          queryParams: { keyword: this.myForm.value.keyword },
        })
        .then(() => {
          this.loadingService.setLoading(false);
        })
        .catch(() => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        });
    }
  }
}
