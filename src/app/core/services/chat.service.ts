import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private readonly httpClient: HttpClient) {}

  public createGroup(data: { _ids: string[] }) {
    try {
      return this.httpClient.post(`${environment.apiUrl}/`, {});
    } catch (error) {}
  }
}
