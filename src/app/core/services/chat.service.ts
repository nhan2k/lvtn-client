import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private readonly httpClient: HttpClient,
    private socket: Socket
  ) {}

  public createGroup({
    postId,
    sellerId,
  }: {
    postId: string;
    sellerId: string;
  }) {
    try {
      return this.httpClient.post(`${environment.apiUrl}/chat`, {
        postId,
        sellerId,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public createMessage(data: any): Observable<any> {
    try {
      return this.socket.emit('sendMessage', data);
      // return this.httpClient.post(`${environment.apiUrl}/chat/message`, data);
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
