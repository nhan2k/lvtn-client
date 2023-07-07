import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly socket: Socket
  ) {}

  public update(id: string | null, data: any): Observable<any> {
    try {
      return this.httpClient.patch(`post/${id}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`post/count`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(filterParams: any): Observable<any> {
    try {
      return this.httpClient.get(`post`, {
        params: filterParams,
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAllBySeller(
    status = 'hide',
    userId: string | null,
    isSelled = false
  ): Observable<any> {
    if (!userId) {
      throw new Error('Id invalid');
    }
    try {
      return this.httpClient.get(`post/user`, {
        params: {
          status,
          isSelled,
          userId,
        },
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getOne(id: string): Observable<any> {
    try {
      return this.httpClient.get(`post/${id}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getPostsNotify(): Observable<any> {
    try {
      return this.httpClient.get(`post/unseen`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public createPost(data: any): Observable<any> {
    try {
      const response = this.httpClient.post(`post`, data);
      if (response) {
        this.socket.emit('sendPostCreate', JSON.stringify(response));
      }
      return response;
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public search(filterParams: any): Observable<any> {
    try {
      return this.httpClient.get(`post/search`, {
        params: filterParams,
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public promote(
    postId: string,
    data: {
      coin: number;
      promotedEndDate: number;
    }
  ): Observable<any> {
    try {
      return this.httpClient.patch(`post/promote/${postId}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
