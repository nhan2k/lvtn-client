import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private readonly httpClient: HttpClient) {}

  public createGroup(_id: string) {
    try {
      return this.httpClient.post(`${environment.apiUrl}/chat`, { _id });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public createMessage(data: any) {
    try {
      return this.httpClient.post(`${environment.apiUrl}/chat/message`, data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getAllGroup() {
    try {
      return this.httpClient.get(`${environment.apiUrl}/chat`);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getAllMessages(groupId: string) {
    try {
      return this.httpClient.get(
        `${environment.apiUrl}/chat/message/${groupId}`
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
