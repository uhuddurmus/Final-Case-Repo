import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { ChatService } from 'src/app/services/chat.service';
import * as signalR from '@microsoft/signalr';
import { forEach } from 'lodash-es';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private connection!: signalR.HubConnection;
  public messages: any[] = [];
  UserName: any;
  UserId: any;

  constructor(
    private router: Router,
    private storage: StorageService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.UserName = this.storage.getUserInfo().fullName;
    this.UserId = this.storage.getUserInfo().id;
    this.chatService
      .getMessageByRoomName(`${this.UserId}`)
      .subscribe((response) => {
        var messagesss = JSON.parse(response).response;
        messagesss.forEach((item: any) => {
          this.messages.push({
            Text: item.text,
            userName: item.userName,
            userId: item.userId,
          });
        });
      });
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:50000/chatHub')
      .build();

    this.connection.on('ReceiveMessage', (message) => {
      console.log(message);
      this.messages.push({
        Text: message.text,
        userName: message.userName,
        userId: message.userId,
      });
    });
    if (this.UserId != 1) {
      this.connection
        .start()
        .then(() => {
          this.connection
            .invoke('JoinRoom', `${this.UserId}`)
            .then(() => console.log('roomiscoonected'))
            .catch((err) => console.error(err.toString()));
        })
        .catch((err) => console.error(err.toString()));
    }
  }

  sendMessage(messageText: any) {
    if (messageText) {
      this.connection
        .invoke('SendMessageToRoom', {
          UserName: this.UserName, // Kullanıcı adını istediğiniz gibi ayarlayın
          Text: messageText,
          UserId: this.UserId, // Kullanıcının kimliği
          RoomName: `${this.UserId}`, // Tüm kullanıcılara göndermek için "0" kullanabilirsiniz
        })
        .then(() => {
          console.log('messageisdended');
          messageText = '';
        });
    }
  }
}
