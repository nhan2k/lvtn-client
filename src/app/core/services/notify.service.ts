import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private socket: Socket) {}

  sendNotify(msg: string) {
    this.socket.emit('sendNotify', msg);
  }
  getNotify() {
    this.socket.on('notifyReceive', (data: string) => {});
  }
}
