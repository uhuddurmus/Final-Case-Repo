import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://localhost:50000/vk/api/v1/Messages';

  constructor(private httpClient: HttpClient) {}

  getMessageByRoomName(roomName: string): Observable<any> {
    const url = `${this.apiUrl}/GetMessageByRoomName?roomName=${roomName}`;
    return this.httpClient.get(url, { responseType: 'text' });
  }
}
