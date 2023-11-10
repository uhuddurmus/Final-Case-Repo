import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId: any;
  user: any = {
    credit: 0,
    addresses: [],
    email: '',
    fullName: '',
    id: 0,
    orders: [],
    profit: '',
    role: '',
  };
  id: number = 0;

  constructor(
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService,
    private userService: UserServiceService
  ) {
    this.userId = this.storage.getUserInfo().id;
  }

  ngOnInit(): void {
    this.id = parseInt(this.router.url.slice(7));
    this.userService.getUserWithId(this.id).subscribe(
      (userData) => {
        this.user = userData.response;
        console.log(userData.response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  uProfit(str: any) {
    this.user.profit = str;
  }
  updateProfit() {
    const newProfit = parseFloat(this.user.profit);
    if (!isNaN(newProfit)) {
      this.userService.updateProfit(this.user.id, newProfit).subscribe(
        () => {
          this.toastr.success('Profit updated successfully');
        },
        (error) => {
          console.error('Error updating profit:', error);
          this.toastr.error('Error updating profit');
        }
      );
    } else {
      this.toastr.error('Please enter a valid profit amount');
    }
  }
  goBack() {
    this.router.navigate([`/users/list`]);
  }
}
