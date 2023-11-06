import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService],
})
export class CartComponent implements OnInit {
  cartItems: any; // Sepet öğelerini saklayacak bir dizi

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.cartItems = this.cartService.getAllCart();
    console.log('Sepet Öğeleri:', this.cartItems[0].productId);
  }
}
