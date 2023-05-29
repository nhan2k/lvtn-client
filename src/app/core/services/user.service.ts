import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  // public approved(id: number, data: any): Observable<any> {
  //   try {
  //     return this.httpClient.patch(`${environment.apiUrl}/post/${id}`, data);
  //   } catch (error) {
  //     throw new Error((error as any).message);
  //   }
  // }

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/user/count`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/user`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public updateStatus(id: string, status: string) {
    try {
      const data = {
        status: status === 'inActive' ? 'active' : 'inActive',
      };
      return this.httpClient.patch(`${environment.apiUrl}/user/${id}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
