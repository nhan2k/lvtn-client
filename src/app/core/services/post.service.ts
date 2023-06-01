import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
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
      return this.httpClient.patch(`${environment.apiUrl}/post/${id}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/count`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(category?: string): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post`, {
        params: {
          name: category || '',
        },
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAllBySeller(status: string): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/user`, {
        params: {
          status,
        },
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getOne(id: string): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/${id}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public createPost(data: any): Observable<any> {
    try {
      return this.httpClient.post(`${environment.apiUrl}/post`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public search(keyword: string): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/search`, {
        params: {
          keyword,
        },
      });
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
