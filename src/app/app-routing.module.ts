import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@shared/components/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PostManageComponent } from './pages/post-manage/post-manage.component';
import { PostCategoryComponent } from './pages/post-category/post-category.component';
import { PostSearchComponent } from './pages/post-search/post-search.component';
import { authRoutes, postCreateRoutes } from '@core/values/routes';
import { CoinComponent } from './pages/coin/coin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RatingComponent } from './pages/rating/rating.component';
import { SettingComponent } from './pages/setting/setting.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { SuggestComponent } from './pages/suggest/suggest.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      ...authRoutes,
      ...postCreateRoutes,
      {
        path: 'post-detail',
        component: PostDetailComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'post-manage',
        component: PostManageComponent,
      },
      {
        path: 'category',
        component: PostCategoryComponent,
      },
      {
        path: 'posts',
        component: PostSearchComponent,
      },
      {
        path: 'coin',
        component: CoinComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'rating',
        component: RatingComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'suggest',
        component: SuggestComponent,
      },
    ],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'verify-phone',
    component: VerifyOtpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
