import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenModule } from './interceptors/token/token.module';
import { postStatusPipe, postIsReviewPipe } from './pipes/posts.pipe';
import { userStatusPipe } from './pipes/users.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [postStatusPipe, postIsReviewPipe, userStatusPipe, TimeAgoPipe],
  imports: [CommonModule, TokenModule],
  exports: [
    TokenModule,
    postStatusPipe,
    postIsReviewPipe,
    userStatusPipe,
    TimeAgoPipe,
  ],
})
export class CoreModule {}
