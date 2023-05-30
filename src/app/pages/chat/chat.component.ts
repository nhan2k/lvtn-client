import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ChatService } from '@core/services/chat.service';
import { LoadingService } from '@core/services/loading.service';

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

  constructor(
    private readonly chatService: ChatService,
    private readonly loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.myForm = this.formBuilder.group({
      text: [null, Validators.required],
      file: [null],
    });
  }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.myEmail = this.authService.getEmail();
    this.chatService.getAllGroup().subscribe((response: any) => {
      if (response.length === 0) {
        this.loadingService.setLoading(false);
      }

      this.groups = response;

      this.currentUser =
        this.myEmail === response?.[0]?.buyerId?.email
          ? response?.[0]?.sellerId?.fullName
          : response?.[0]?.buyerId?.fullName;
      this.chatService
        .getAllMessages(response[0]._id)
        .subscribe((response: any) => {
          this.messages = response;
          this.loadingService.setLoading(false);
        });
    });

    this.scrollToBottom();

    setInterval(() => {
      this.chatService
        .getAllMessages(this.groups?.[0]?._id)
        .subscribe((response: any) => {
          this.messages = response;
        });
    }, 1000);
  }

  onSubmitMessage() {
    try {
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
            groupId: this.groups[0]._id,
          })
          .subscribe((response) => {});
        this.myForm.reset();
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
