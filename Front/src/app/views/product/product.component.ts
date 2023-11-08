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
  piece: any = 0;
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
    paymentMethod: '',
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
  uPiece(str: any) {
    this.piece = str;
    console.log(this.piece);
  }
  ngOnInit() {
    this.id = this.router.url.slice(9);
    this.gain = this.storage.getUserInfo().profit;
    this.userId = this.storage.getUserInfo().id;
    this.productService.getProductById(this.id, this.gain, this.tax).subscribe(
      (response) => {
        // İşlem başarılı olduğunda response işlenebilir.
        this.product = response.response;
      },
      (error) => {
        // Hata durumunda error işlenebilir.
        console.error(error);
      }
    );
  }
  updateProduct() {
    if (this.piece > 5) {
      this.productService.updateProductStock(this.id, this.piece).subscribe(
        (response) => {
          // İşlem başarılı olduğunda response işlenebilir.
          this.toastr.success('Updated');
          this.router.navigate(['/']);
        },
        (error) => {
          // Hata durumunda error işlenebilir.
          console.error(error);
          this.toastr.error('Failed');
        }
      );
    } else {
      this.toastr.error('Piece must bigger than 5');
    }
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
