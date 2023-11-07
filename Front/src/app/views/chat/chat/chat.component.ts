import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { ChatService } from 'src/app/services/chat.service';
import * as signalR from '@microsoft/signalr';
import { forEach } from 'lodash-es';
import { UserServiceService } from 'src/app/services/user-service.service';

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
  Users: any[] = [];
  SelectedUser: any;
  constructor(
    private userService: UserServiceService,
    private storage: StorageService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.UserId = this.storage.getUserInfo().id;
    this.UserName = this.storage.getUserInfo().fullName;
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
      this.SelectedUser = this.UserId;
      this.activateChat();
      this.connection
        .start()
        .then(() => {
          this.connection
            .invoke('JoinRoom', `${this.SelectedUser}`)
            .then(() => console.log('roomiscoonected'))
            .catch((err) => console.error(err.toString()));
        })
        .catch((err) => console.error(err.toString()));
    } else if (this.UserId == 1) {
      this.getUsersForAdmin();
    }
  }
  getUsersForAdmin() {
    this.userService.getUsers().subscribe((response) => {
      console.log(response.response);
      response.response.forEach((user: any) => {
        this.Users.push({
          name: user.fullName,
          id: user.id,
        });
      });
    });
  }
  selectNewUser() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  activateChat() {
    this.chatService
      .getMessageByRoomName(`${this.SelectedUser}`)
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
  }
  setUser(id: any) {
    this.SelectedUser = id;
    this.connection
      .start()
      .then(() => {
        this.connection
          .invoke('JoinRoom', `${this.SelectedUser}`)
          .then((res) => console.log('roomiscoonected', res))
          .catch((err) => console.error(err.toString()));
      })
      .catch((err) => console.error(err.toString()));
    this.activateChat();
  }
  sendMessage(messageText: any) {
    if (messageText) {
      this.connection
        .invoke('SendMessageToRoom', {
          UserName: this.UserName, // Kullanıcı adını istediğiniz gibi ayarlayın
          Text: messageText,
          UserId: this.UserId, // Kullanıcının kimliği
          RoomName: `${this.SelectedUser}`, // Tüm kullanıcılara göndermek için "0" kullanabilirsiniz
        })
        .then((res) => console.log('mesage sended', res))
        .catch((err) => console.error(err.toString()));
    }
  }
  sendToAll(messageText: any) {
    if (messageText) {
      this.connection
        .invoke('SendMessage', {
          UserName: this.UserName, // Kullanıcı adını istediğiniz gibi ayarlayın
          Text: messageText,
          UserId: this.UserId, // Kullanıcının kimliği
          RoomName: `${this.SelectedUser}`, // Tüm kullanıcılara göndermek için "0" kullanabilirsiniz
        })
        .then((res) => console.log('mesage sended', res))
        .catch((err) => console.error(err.toString()));
    }
  }
}
