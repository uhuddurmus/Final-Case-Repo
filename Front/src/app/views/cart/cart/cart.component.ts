import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService],
})
export class CartComponent implements OnInit {
  cartItems: any; // Sepet öğelerini saklayacak bir dizi

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.getAllCartItems();
  }
  isBuyButtonDisabled(): boolean {
    return this.cartItems.length === 0;
  }
  getAllCartItems() {
    this.cartItems = this.cartService.getAllCart();
    console.log('Sepet Öğeleri:', this.cartItems);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item); // Sepetten öğeyi kaldır
    this.getAllCartItems(); // Sepet içeriğini güncelle
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
}
