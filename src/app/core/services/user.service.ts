import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from './handleError';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`user/count`).pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(): Observable<any> {
    try {
      return this.httpClient.get(`user`).pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public updateStatus(id: string, status: string): Observable<any> {
    try {
      const data = {
        status: status === 'inActive' ? 'active' : 'inActive',
      };
      return this.httpClient
        .patch(`user/${id}`, data)
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getWallet(): Observable<any> {
    try {
      return this.httpClient
        .get('user/wallet/byUser')
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public createPayment(data: { coin: number }): Observable<any> {
    try {
      return this.httpClient
        .post('user/payment', data)
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifySendEmail(): Observable<any> {
    try {
      return this.httpClient
        .get('user/verifySendEmail')
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifyEmail(userId: string): Observable<any> {
    try {
      return this.httpClient
        .get(`user/verifyEmail/${userId}`)
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifySendPhoneNumber(): Observable<any> {
    try {
      return this.httpClient
        .get('user/verifySendPhone')
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public verifyPhoneNumber(userId?: string, otp?: string): Observable<any> {
    if (!userId || !otp) {
      throw new Error('Invalid');
    }
    try {
      return this.httpClient
        .post(`user/verifyPhone/${userId}`, { otp })
        .pipe(catchError(handleError));
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
      return this.httpClient
        .post('rating', {
          userId,
          userTargetId,
          postId,
          rate,
          comment,
        })
        .pipe(catchError(handleError));
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
      return this.httpClient
        .get('rating', {
          params,
        })
        .pipe(catchError(handleError));
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
      return this.httpClient
        .get('rating/avg', {
          params,
        })
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public createOrUpdateSuggest(
    data: { categoryName: string },
    isSuggested: boolean
  ): Observable<any> {
    try {
      return this.httpClient
        .post('user/suggest', data)
        .pipe(catchError(handleError));
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
