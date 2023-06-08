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
import { message } from '@core/values/error.message';
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
  userId: string | null;

  formData: FormData = new FormData();
  taxableValue: string = '';
  formatCurrency_TaxableValue(event: any) {
    var uy = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(event.target.value);
    this.taxableValue = uy;
  }
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
    this.userId = this.authService.getId();

    this.socket.on('receivedMessage', (data: any) => {
      this.messages = [...this.messages, data];
    });
  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.myEmail = this.authService.getEmail();

    this.route.queryParams.subscribe({
      next: (params) => {
        this.messages = [];
        if (params['groupId']) {
          this.groupId = params['groupId'];

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

              this.socket.emit('createRoom', this.groupId);
              this.loadingService.setLoading(false);
            },
            error: (error) => {
              this.toastrService.error(message);
              this.loadingService.setLoading(false);
            },
          });

          this.chatService.getAllMessages(this.groupId).subscribe({
            next: (response: any) => {
              this.messages = response;
            },
            error: (error) => {
              this.toastrService.error(message);
              this.loadingService.setLoading(false);
            },
          });
        } else {
          this.loadingService.setLoading(false);
        }
      },
      error: (error) => {
        this.toastrService.error(message);
        this.loadingService.setLoading(false);
      },
    });

    this.scrollToBottom();
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
        this.toastrService.error(message);
        this.loadingService.setLoading(false);
      });
  }
}
