import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  templateUrl: 'product.component.html',
  providers: [],
})
export class ProductComponent implements OnInit {
  id: string = '';
  gain: any = 0;
  tax: any = 18;
  count: number = 1;
  product: any = undefined;
  constructor(
    private router: Router,
    private CartService: CartService,
    private storage: StorageService,
    private productService: ProductService
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
    this.productService.getProductById(this.id, this.gain, this.tax).subscribe(
      (response) => {
        // İşlem başarılı olduğunda response işlenebilir.
        this.product = response.response;
        console.log('pro', this.product);
      },
      (error) => {
        // Hata durumunda error işlenebilir.
        console.error(error);
      }
    );
  }
  addTocard() {}
}
