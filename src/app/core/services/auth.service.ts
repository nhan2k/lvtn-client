import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokens } from '@core/interfaces/shared/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  storeToken(tokens: ITokens) {
    sessionStorage.setItem('access_token', tokens.access_token);
    sessionStorage.setItem('refresh_token', tokens.refresh_token);
    sessionStorage.setItem('email', tokens.email);
    sessionStorage.setItem('_id', tokens._id);
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  getId() {
    return sessionStorage.getItem('_id');
  }

  getEmail() {
    return sessionStorage.getItem('email');
  }

  logout() {
    sessionStorage.clear();
  }

  login(credentials?: {
    phoneNumber?: string;
    password?: string;
  }): Observable<any> {
    try {
      return this.httpClient.post(`user/login`, credentials);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  register(credentials?: {
    phoneNumber?: string;
    password?: string;
  }): Observable<any> {
    try {
      return this.httpClient.post(`user/register`, credentials);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  getProfile(): Observable<any> {
    try {
      const _id = this.getId();
      return this.httpClient.get(`user/${_id}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  getTargetUserProfile(userId: string): Observable<any> {
    try {
      const _id = userId;
      return this.httpClient.get(`user/${_id}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  updateProfile(data: any): Observable<any> {
    try {
      return this.httpClient.patch(`user/update/profile`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
