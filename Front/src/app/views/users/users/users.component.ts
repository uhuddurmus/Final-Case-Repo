import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userId: any;
  users: any[] = [];

  ngOnInit(): void {
    this.getStarted();
  }

  constructor(
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService,
    private UserService: UserServiceService
  ) {}

  getStarted() {
    this.userId = this.storage.getUserInfo().id;
    if (this.userId == 1) {
      this.UserService.getUsers().subscribe({
        next: (data: any) => {
          this.users = data.response;
          console.log(this.users);
        },
        error: (err) => {
          this.toastr.error("Can't get user data");
        },
      });
    }
  }

  updateUser(id: number) {
    this.router.navigate([`/users/${id}`]);
  }
}
