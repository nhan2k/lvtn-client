import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ChatService } from '@core/services/chat.service';
import { LoadingService } from '@core/services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', { static: false })
  private myScrollContainer: ElementRef<HTMLDivElement> = {} as ElementRef;

  groups: any[] = [];
  currentUser: string = '';
  messages: any[] = [];
  myEmail: string | null = null;

  formData: FormData = new FormData();
  myForm: FormGroup;

  groupId: string | null = null;

  constructor(
    private readonly chatService: ChatService,
    private readonly loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {
    this.myForm = this.formBuilder.group({
      text: [null, Validators.required],
      file: [null],
    });
  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParams.subscribe(
      (params) => {
        if (params['groupId']) {
          this.groupId = params['groupId'];
          this.chatService.getAllMessages(params['groupId']).subscribe(
            (response: any) => {
              this.messages = response;
            },
            (error) => {
              this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
              this.loadingService.setLoading(false);
            }
          );
        } else {
          this.loadingService.setLoading(false);
        }
      },
      (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      }
    );
    this.myEmail = this.authService.getEmail();
    this.chatService.getAllGroup().subscribe(
      (response: any) => {
        if (response.length === 0) {
          this.loadingService.setLoading(false);
        }
        const objChat = response.filter(
          (value: any) => value?._id === this.groupId
        )[0];
        this.currentUser =
          objChat?.buyerId?.email === this.myEmail
            ? objChat?.sellerId?.fullName
            : objChat?.buyerId?.fullName;
        this.groups = response;

        this.loadingService.setLoading(false);
      },
      (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      }
    );

    this.scrollToBottom();

    // setInterval(() => {
    //   if (this.groupId) {
    //     this.chatService
    //       .getAllMessages(this.groupId)
    //       .subscribe((response: any) => {
    //         this.currentUser = response?.[0]?.userId?.email;

    //         this.messages = response;
    //       }, (error) => {
    //   this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
    //   this.loadingService.setLoading(false);
    // });
    //   }
    // }, 1000);
  }

  onSubmitMessage() {
    if (this.myForm.valid) {
      for (const key in this.myForm.value) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.value, key)) {
          const element = this.myForm.value[key];
          this.formData.append(key, element);
        }
      }

      this.chatService
        .createMessage({
          ...this.myForm.value,
          groupId: this.groupId,
        })
        .subscribe(
          (response) => {},
          (error) => {
            this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
            this.loadingService.setLoading(false);
          }
        );
      this.myForm.reset();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop =
      this.myScrollContainer.nativeElement.scrollHeight;
  }

  onChangeUser(groupId: string) {
    this.loadingService.setLoading(true);
    this.router
      .navigate(['/chat'], {
        queryParams: { groupId: groupId },
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
