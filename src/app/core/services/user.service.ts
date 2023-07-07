import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`user/count`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(): Observable<any> {
    try {
      return this.httpClient.get(`user`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public updateStatus(id: string, status: string): Observable<any> {
    try {
      const data = {
        status: status === 'inActive' ? 'active' : 'inActive',
      };
      return this.httpClient.patch(`user/${id}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getWallet(): Observable<any> {
    try {
      return this.httpClient.get('user/wallet/byUser');
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public createPayment(data: { coin: number }): Observable<any> {
    try {
      return this.httpClient.post('user/payment', data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifySendEmail(): Observable<any> {
    try {
      return this.httpClient.get('user/verifySendEmail');
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifyEmail(userId: string): Observable<any> {
    try {
      return this.httpClient.get(`user/verifyEmail/${userId}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public rating(
    userId: string,
    userTargetId: string,
    rate: number,
    comment: string,
    postId?: string
  ): Observable<any> {
    try {
      return this.httpClient.post('rating', {
        userId,
        userTargetId,
        postId,
        rate,
        comment,
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAllRatings(userId: string | null): Observable<any> {
    if (!userId) {
      throw new Error('Id invalid');
    }
    try {
      const params = {
        userId,
      };
      return this.httpClient.get('rating', {
        params,
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getRatingAvg(userId: string | null): Observable<any> {
    if (!userId) {
      throw new Error('Id invalid');
    }
    try {
      const params = {
        userId,
      };
      return this.httpClient.get('rating/avg', {
        params,
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
