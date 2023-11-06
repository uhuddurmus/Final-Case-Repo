import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  wallet: number = 0;
  debt: number = 0;
  cartItems: any; // Sepet öğelerini saklayacak bir dizi
  eftaMounth: any;
  constructor(
    private storage: StorageService,
    private PaymentService: PaymentService,
    private cartService: CartService,
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }
  updateeft(num: any) {
    this.eftaMounth = num;
    console.log(this.eftaMounth);
  }
  getAllCartItems() {
    this.cartItems = this.cartService.getAllCart();
    this.wallet = this.storage.getUserInfo().credit;
    this.debt = this.calculateTotal();
  }
  startEft() {
    this.PaymentService.makePayment(this.eftaMounth, false).subscribe(
      (response: any) => {
        console.log('EFT Response:', response);
        this.userService.getUserDataInfo().subscribe({
          next: (data) => {
            this.storage.saveUserInfo(data.response);
            this.getAllCartItems();
          },
          error: (err) => {},
        });
        this.toastr.success('Eft Success');
      },
      (error: any) => {
        console.error('EFT Error:', error);
        this.toastr.error('Eft error');
      }
    );
  }
  calculateTotal() {
    return this.cartItems.reduce(
      (total: any, item: any) => total + item.price * item.piece,
      0
    );
  }

  buyItems() {}
}
