import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  templateUrl: 'product.component.html',
  providers: [],
})
export class ProductComponent implements OnInit {
  id: string = '';
  gain: any = 0;
  tax: any = 18;
  product: any = undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private productService: ProductService
  ) {}

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
}
