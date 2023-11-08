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
  warning: any[] = [];
  productBrand: any = ''; // ProductBrand değişkenini string olarak tanımladık
  productType: any = ''; // ProductType değişkenini string olarak tanımladık
  gain: any = 0;
  tax: any = 18;
  cad: string = 'd-none';
  value: string = 'text-center';
  id: any;
  constructor(
    private storage: StorageService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProducts();
    this.id = this.storage.getUserInfo().id;
  }
  ref() {
    this.updateProducts();
    this.value = 'd-none';
    this.cad = 'mb-4';
  }
  updateProductBrand(brand: any) {
    this.productBrand = brand;
    this.updateProducts();
  }
  updateProductType(type: any) {
    this.productType = type;
    this.updateProducts();
  }
  calculateTotalWaitingProducts() {
    this.warning = this.products.filter((item) => item.piece <= 5);
  }
  navigateToProductPage(id: any) {
    // Use the Router service to navigate to the "product" page
    this.router.navigate([`/product/${id}`]); // Replace 'product' with the actual route path to your product page
  }
  addProduct() {
    this.router.navigate([`/dashboard/addproduct`]); // Replace 'product' with the actual route path to your product page
  }
  updateProducts() {
    this.gain = this.storage.getUserInfo().profit;

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
          console.log(this.products);
          this.calculateTotalWaitingProducts();
        },
        (error) => {
          console.error('Ürün verileri getirilirken hata oluştu:', error);
        }
      );
  }
}
