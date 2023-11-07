import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  id: any;
  product: any = {
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    productType: '',
    productBrand: '',
    piece: 0,
  };
  isSaveEnabled: boolean = false; // Eklendi

  constructor(
    private storage: StorageService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  checkButtonState() {
    // Gerekli koşulları kontrol ederek 'isSaveEnabled' değerini ayarla
    this.isSaveEnabled =
      this.product.name &&
      this.product.description &&
      this.product.pictureUrl &&
      this.product.productType &&
      this.product.productBrand &&
      this.product.piece > 0 &&
      this.product.price > 0;
  }
  uname(inp: any) {
    this.product.name = inp;
    this.checkButtonState();
  }
  udescription(inp: any) {
    this.product.description = inp;
    this.checkButtonState();
  }
  upictureUrl(inp: any) {
    this.product.Url = inp;
    this.checkButtonState();
  }
  uproductType(inp: any) {
    this.product.productType = inp;
    this.checkButtonState();
  }
  uproductBrand(inp: any) {
    this.product.productBrand = inp;
    this.checkButtonState();
  }
  upiece(inp: any) {
    this.product.piece = inp;
    this.checkButtonState();
  }
  uprice(inp: any) {
    this.product.price = inp;
    this.checkButtonState();
    console.log(this.isSaveEnabled);
  }
  ngOnInit(): void {
    this.id = this.storage.getUserInfo().id;
  }

  saveProduct() {
    // productService ile addProduct fonksiyonunu kullanarak ürünü kaydedin
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        // Kaydetme işlemi başarılı olduysa yapılacak işlemler
        console.log('Product saved:', response);
        this.toastr.success('Created');

        // Yönlendirme veya diğer işlemleri burada ekleyebilirsiniz
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        this.toastr.error('Error', error.message);
        console.log(error);
      }
    );
  }
}
