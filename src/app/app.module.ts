import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import { PostCreateApartmentComponent } from './pages/post-create/apartment/apartment.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostCreateCarComponent } from './pages/post-create/car/car.component';
import { PostCreateGroundComponent } from './pages/post-create/ground/ground.component';
import { PostCreateHouseComponent } from './pages/post-create/house/house.component';
import { PostCreateMotorbikeComponent } from './pages/post-create/motorbike/motorbike.component';
import { PostCreateOfficeComponent } from './pages/post-create/office/office.component';
import { PostCreatePhoneComponent } from './pages/post-create/phone/phone.component';
import { PostCreateLaptopComponent } from './pages/post-create/laptop/laptop.component';
import { PostCreateMotelRoomComponent } from './pages/post-create/motel-room/motel-room.component';
import { PostCreateElectricBicycleComponent } from './pages/post-create/electric-bicycle/electric-bicycle.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ChatComponent } from './pages/chat/chat.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostManageComponent } from './pages/post-manage/post-manage.component';
import { PostCategoryComponent } from './pages/post-category/post-category.component';
import { PostsComponent } from './shared/posts/posts.component';
import { PostSearchComponent } from './pages/post-search/post-search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  DEFAULT_TIMEOUT,
  TokenInterceptor,
} from '@core/interceptors/token/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './shared/components/rating/rating.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { AddressFormComponent } from './shared/components/address-form/address-form.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingComponent,
    LoginComponent,
    AuthLayoutComponent,
    HomeComponent,
    PostCreateApartmentComponent,
    PostCreateComponent,
    PostCreateCarComponent,
    PostCreateGroundComponent,
    PostCreateHouseComponent,
    PostCreateMotorbikeComponent,
    PostCreateOfficeComponent,
    PostCreatePhoneComponent,
    PostCreateLaptopComponent,
    PostCreateMotelRoomComponent,
    PostCreateElectricBicycleComponent,
    PostDetailComponent,
    ChatComponent,
    RegisterComponent,
    PostManageComponent,
    PostCategoryComponent,
    PostsComponent,
    PostSearchComponent,
    ProfileComponent,
    RatingComponent,
    FilterComponent,
    AddressFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    [{ provide: DEFAULT_TIMEOUT, useValue: 5000 }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
