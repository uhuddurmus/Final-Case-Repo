import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { OrderService } from 'src/app/services/order.service';
import { forkJoin } from 'rxjs';

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
  cardHolder: any;
  cardNumber: any;
  exDate: any;
  cvv: any;
  isButtonActive: boolean = false;
  constructor(
    private storage: StorageService,
    private PaymentService: PaymentService,
    private cartService: CartService,
    private userService: UserServiceService,
    private toastr: ToastrService,
    private OrderService: OrderService,
    private router: Router
  ) {}

  updatecardHolder(str: any) {
    this.cardHolder = str;
    this.checkButtonState();
  }
  updatecordNumber(str: any) {
    this.cardNumber = str;
    this.checkButtonState();
  }
  updateexDate(str: any) {
    this.exDate = str;
    this.checkButtonState();
  }
  updatecvv(str: any) {
    this.cvv = str;
    this.checkButtonState();
  }

  ngOnInit(): void {
    this.getAllCartItems();
    console.log(typeof this.debt);
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
  checkButtonState() {
    const isCardHolderValid = this.cardHolder.length >= 4;
    const isCardNumberValid =
      !isNaN(parseFloat(this.cardNumber)) && this.cardNumber.length === 16;
    const isExDateValid =
      !isNaN(parseFloat(this.exDate)) && this.exDate.length === 4;
    const isCvvValid = !isNaN(parseFloat(this.cvv)) && this.cvv.length === 3;

    // Check all conditions to determine the button state
    console.log();
    this.isButtonActive =
      isCardHolderValid && isCardNumberValid && isExDateValid && isCvvValid;
    return this.isButtonActive;
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
  navigateToAddress() {
    this.router.navigate([`/cart/address`]); // Replace 'product' with the actual route path to your product page
  }
  navigateToHome() {
    this.router.navigate([`/dashboard`]); // Replace 'product' with the actual route path to your product page
  }
  buyItems() {
    this.PaymentService.makePayment(Math.floor(this.debt), true).subscribe(
      (response: any) => {
        console.log('EFT Response:', response);

        this.toastr.success('Payment Success');
      },
      (error: any) => {
        console.error('Payment Error:', error);
        this.toastr.error('Payment error');
      }
    );
    const orderObservables = this.cartItems.map((element: any) => {
      console.log('element', element);

      element.paymentMethod = 'wallet';
      console.log('element', element);

      return this.OrderService.postOrder(element);
    });

    forkJoin(orderObservables).subscribe(
      (responses: any) => {
        console.log('All orders created:', responses);
        this.cartService.removeAllFromCart();
        this.toastr.success('Payment Success');
        this.userService.getUserDataInfo().subscribe({
          next: (data) => {
            this.storage.saveUserInfo(data.response);
            this.getAllCartItems();
          },
          error: (err) => {},
        });
        this.navigateToHome();
        // Tüm siparişler tamamlandıktan sonra bu kısımda yapmak istediğiniz işlemi ekleyebilirsiniz.
      },
      (error: any) => {
        console.error('Order creation error:', error);
        this.toastr.error('Payment error');

        // Sipariş oluşturma sırasında bir hata oluşursa bu kısmı işleyebilirsiniz.
      }
    );
  }
  buyWithCard() {
    const orderObservables = this.cartItems.map((element: any) => {
      element.paymentMethod = 'card';

      return this.OrderService.postOrder(element);
    });

    forkJoin(orderObservables).subscribe(
      (responses: any) => {
        console.log('All orders created:', responses);
        this.cartService.removeAllFromCart();
        this.toastr.success('Payment Success');
        this.userService.getUserDataInfo().subscribe({
          next: (data) => {
            this.storage.saveUserInfo(data.response);
            this.getAllCartItems();
          },
          error: (err) => {},
        });
        this.navigateToHome();
        // Tüm siparişler tamamlandıktan sonra bu kısımda yapmak istediğiniz işlemi ekleyebilirsiniz.
      },
      (error: any) => {
        console.error('Order creation error:', error);
        this.toastr.error('Payment error');

        // Sipariş oluşturma sırasında bir hata oluşursa bu kısmı işleyebilirsiniz.
      }
    );
  }
}
