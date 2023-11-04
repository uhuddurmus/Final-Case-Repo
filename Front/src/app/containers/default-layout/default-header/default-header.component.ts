import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  user: any;
  userData: any;
  token: any;
  userpp: any;

  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.token = this.storage.getToken();

    this.userService.getUserDataInfo(this.token).subscribe({
      next: (data) => {
        this.userData = data.response;
        this.storage.saveUserInfo(data.response);
        this.userpp = data?.response?.fullName?.split(' ')
        .map((word: any) => word.charAt(0))
        .join('');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  signOut() {
    this.auth.logOut();
  }
}
