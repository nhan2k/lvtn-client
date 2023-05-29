import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from '@shared/components/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { PostCreateApartmentComponent } from './pages/post-create/apartment/apartment.component';
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

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'post-create',
        component: PostCreateComponent,
      },
      {
        path: 'apartment',
        component: PostCreateApartmentComponent,
      },
      {
        path: 'car',
        component: PostCreateCarComponent,
      },
      {
        path: 'ground',
        component: PostCreateGroundComponent,
      },
      {
        path: 'house',
        component: PostCreateHouseComponent,
      },
      {
        path: 'motorbike',
        component: PostCreateMotorbikeComponent,
      },
      {
        path: 'office',
        component: PostCreateOfficeComponent,
      },
      {
        path: 'phone',
        component: PostCreatePhoneComponent,
      },
      {
        path: 'laptop',
        component: PostCreateLaptopComponent,
      },
      {
        path: 'motel-room',
        component: PostCreateMotelRoomComponent,
      },
      {
        path: 'electric-bicycle',
        component: PostCreateElectricBicycleComponent,
      },
      {
        path: 'post-detail',
        component: PostDetailComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
