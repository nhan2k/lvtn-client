import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { PostCreateComponent } from 'src/app/pages/post-create/post-create.component';
import { PostCreateApartmentComponent } from 'src/app/pages/post-create/apartment/apartment.component';
import { PostCreateCarComponent } from 'src/app/pages/post-create/car/car.component';
import { PostCreateGroundComponent } from 'src/app/pages/post-create/ground/ground.component';
import { PostCreateHouseComponent } from 'src/app/pages/post-create/house/house.component';
import { PostCreateMotorbikeComponent } from 'src/app/pages/post-create/motorbike/motorbike.component';
import { PostCreateOfficeComponent } from 'src/app/pages/post-create/office/office.component';
import { PostCreatePhoneComponent } from 'src/app/pages/post-create/phone/phone.component';
import { PostCreateLaptopComponent } from 'src/app/pages/post-create/laptop/laptop.component';
import { PostCreateMotelRoomComponent } from 'src/app/pages/post-create/motel-room/motel-room.component';
import { PostCreateElectricBicycleComponent } from 'src/app/pages/post-create/electric-bicycle/electric-bicycle.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

export const postCreateRoutes: Routes = [
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
];
