import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  templateUrl: 'product.component.html',
  providers: [CartService],
})
export class ProductComponent implements OnInit {
  id: string = '';
  userId: any;
  gain: any = 0;
  tax: any = 18;
  count: number = 1;
  product: any = undefined;
  cart: CartItem = {
    userId: '',
    productId: '',
    name: '',
    description: '',
    price: '',
    pictureUrl: '',
    productType: '',
    productBrand: '',
    piece: '',
    status: '',
  };
  constructor(
    private router: Router,
    private CartService: CartService,
    private storage: StorageService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  up() {
    if (this.count <= this.product.piece - 1) {
      this.count = this.count + 1;
    }
  }
  down() {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }
  ngOnInit() {
    this.id = this.router.url.slice(9);
    this.gain = this.storage.getUserInfo().profit;
    this.userId = this.storage.getUserInfo().id;
    this.productService.getProductById(this.id, this.gain, this.tax).subscribe(
      (response) => {
        // İşlem başarılı olduğunda response işlenebilir.
        this.product = response.response;
        console.log('product', this.product);
      },
      (error) => {
        // Hata durumunda error işlenebilir.
        console.error(error);
      }
    );
  }

  addTocart() {
    this.cart.userId = this.userId;
    this.cart.productId = this.product.id;
    this.cart.name = this.product.name;
    this.cart.description = this.product.description;
    this.cart.price = Math.floor(this.product.price);
    this.cart.pictureUrl = this.product.pictureUrl;
    this.cart.productType = this.product.productType;
    this.cart.productBrand = this.product.productBrand;
    this.cart.piece = this.count;
    this.cart.status = 'active';
    this.CartService.addToCart(this.cart);
    this.toastr.info('Added to Cart');
    this.router.navigate(['/cart']);
  }
}
