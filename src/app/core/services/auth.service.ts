import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokens } from '@core/interfaces/shared/auth';
import { environment } from '@environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  storeToken(tokens: {
    access_token: string;
    refresh_token: string;
    email: string;
  }) {
    sessionStorage.setItem('access_token', tokens.access_token);
    sessionStorage.setItem('refresh_token', tokens.refresh_token);
    sessionStorage.setItem('email', tokens.email);
  }

  getToken() {
    return sessionStorage.getItem('access_token');
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
      return this.httpClient.post(
        `${environment.apiUrl}/user/login`,
        credentials
      );
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  register(credentials?: {
    phoneNumber?: string;
    password?: string;
  }): Observable<any> {
    try {
      return this.httpClient.post(
        `${environment.apiUrl}/user/register`,
        credentials
      );
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
