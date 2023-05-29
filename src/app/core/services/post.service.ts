import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  public approved(id: string | null, data: any): Observable<any> {
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

  public getAll(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post`);
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

  public createPost(
    data:
      | {
          categoryName: string;
          type: string;
          nameOfBuilding: string;
          address: string;
          codeOfBuilding: string;
          block: string;
          floor: number;
          typeOfBuilding: string;
          numberOfBedroom: number;
          numberOfBathroom: number;
          balconnyDirection: string;
          doorDirection: string;
          interiorCondition: string;
          juridical: string;
          area: number;
          title: string;
          content: string;
        }
      | any
  ): Observable<any> {
    try {
      return this.httpClient.post(`${environment.apiUrl}/post`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public upload(data: any) {
    try {
      return this.httpClient.post(`${environment.apiUrl}/post/uploads`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
