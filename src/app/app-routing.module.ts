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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
