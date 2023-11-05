import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  productBrand: any = ''; // ProductBrand değişkenini string olarak tanımladık
  productType: any = ''; // ProductType değişkenini string olarak tanımladık
  gain: any = 0;
  tax: any = 18;

  constructor(
    private storage: StorageService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gain = this.storage.getUserInfo().profit;
    this.updateProducts();
  }

  updateProductBrand(brand: any) {
    this.productBrand = brand;
    this.updateProducts();
  }
  updateProductType(type: any) {
    this.productType = type;
    this.updateProducts();
  }
  navigateToProductPage(id: any) {
    // Use the Router service to navigate to the "product" page
    this.router.navigate([`/product/${id}`]); // Replace 'product' with the actual route path to your product page
  }
  updateProducts() {
    this.productService
      .getProductsByParameter(
        this.productBrand,
        this.productType,
        this.gain,
        this.tax
      )
      .subscribe(
        (response) => {
          this.products = response.response;
          console.log('Ürünler güncellendi', this.products);
        },
        (error) => {
          console.error('Ürün verileri getirilirken hata oluştu:', error);
        }
      );
  }
}
