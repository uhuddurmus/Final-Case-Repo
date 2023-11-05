import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProductService } from 'src/app/services/product.service';

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
    private productService: ProductService
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
