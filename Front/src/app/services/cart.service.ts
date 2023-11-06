import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItem {
  productId: any;
  name: any;
  description: any;
  price: any;
  pictureUrl: any;
  productType: any;
  productBrand: any;
  piece: any;
  status: any;
}
export class CartService {
  private cart: CartItem[] = [];

  constructor() {}

  addToCart(item: CartItem) {
    // Session Storage'den mevcut sepeti al
    const cartFromStorage = window.sessionStorage.getItem('cart');
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }

    // Sepette aynı ürün varsa miktarını artır
    const existingItemIndex = this.cart.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );
    console.log(existingItemIndex);

    if (existingItemIndex !== -1) {
      this.cart[existingItemIndex].piece += item.piece;
    } else {
      this.cart.push(item);
    }

    // Sepeti sessionStorage'e kaydet
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(item: CartItem) {
    // Session Storage'den mevcut sepeti al
    const cartFromStorage = window.sessionStorage.getItem('cart');
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }

    // Ürünü sepetten kaldır
    const index = this.cart.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );
    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    // Sepeti sessionStorage'e kaydet
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public getAllCart(): any {
    const cart = window.sessionStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
  }
  removeAllFromCart() {
    this.cart = [];
    // Sepeti sessionStorage'den temizle
    sessionStorage.removeItem('cart');
  }
}
