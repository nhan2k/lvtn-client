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
import { Socket } from 'ngx-socket-io';
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

  groupId: string = '';

  token: string | null;

  constructor(
    private readonly chatService: ChatService,
    private readonly loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly socket: Socket
  ) {
    this.myForm = this.formBuilder.group({
      text: [null, Validators.required],
      file: [null],
    });

    this.token = this.authService.getToken();
  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.myEmail = this.authService.getEmail();

    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['groupId']) {
          this.groupId = params['groupId'];
        } else {
          this.loadingService.setLoading(false);
        }
      },
      error: (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      },
    });

    this.chatService.getAllGroup().subscribe({
      next: (response: any) => {
        if (response.length === 0) {
          this.loadingService.setLoading(false);
        }

        this.groups = response;

        const filterGroup = response.filter(
          (res: any) => res._id === this.groupId
        )[0];

        this.currentUser =
          filterGroup?.buyerId?.email === this.myEmail
            ? filterGroup?.sellerId?.fullName
            : filterGroup?.buyerId?.fullName;

        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      },
    });

    this.chatService.getAllMessages(this.groupId).subscribe({
      next: (response: any) => {
        this.messages = response;
      },
      error: (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      },
    });

    this.scrollToBottom();

    this.socket.on('receivedMessage', (data: any) => {
      this.messages = [...this.messages, data];
    });
  }

  onSubmitMessage() {
    if (this.myForm.valid) {
      for (const key in this.myForm.value) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.value, key)) {
          const element = this.myForm.value[key];
          this.formData.append(key, element);
        }
      }

      this.chatService.createMessage({
        ...this.myForm.value,
        groupId: this.groupId,
        token: this.token,
      });
      this.myForm.reset();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this?.myScrollContainer?.nativeElement?.scrollHeight) {
      this.myScrollContainer.nativeElement.scrollTop =
        this?.myScrollContainer?.nativeElement?.scrollHeight;
    }
  }

  onChangeUser(groupId: string, userName: string) {
    this.loadingService.setLoading(true);
    this.currentUser = userName;

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
