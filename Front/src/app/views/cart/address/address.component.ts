import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AddressService } from 'src/app/services/address.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Validators ekleyin

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  address: any = [];

  addressForm = new FormGroup({
    userId: new FormControl(''),
    postalCode: new FormControl(''),
    county: new FormControl('', Validators.required), // county için Validators.required ekleyin
    city: new FormControl('', Validators.required), // city için Validators.required ekleyin
    addressLine2: new FormControl(''),
    addressLine1: new FormControl('', Validators.required), // addressLine1 için Validators.required ekleyin
  });

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private storage: StorageService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.address = this.storage.getUserInfo().addresses;
    console.log('add', this.address.length);
  }
  goPayment() {
    this.router.navigate([`/cart/payment`]); // Replace 'product' with the actual route path to your product page
  }
  addNewAddress() {
    var id = this.storage.getUserInfo().id;
    this.addressForm.value.userId = id;
    console.log('naddre', this.addressForm.value);

    if (this.addressForm.valid) {
      // Gerekli alanlar doluysa yeni adresi ekleme işlemini gerçekleştirin
      console.log(this.addressForm.value);
      this.addressService
        .addAddress(this.addressForm.value)
        .subscribe((response) => {
          console.log('Yeni adres eklendi:', response);
          this.userService.getUserDataInfo().subscribe({
            next: (data) => {
              this.storage.saveUserInfo(data.response);
              this.address = this.storage.getUserInfo().addresses;
            },
            error: (err) => {},
          });
        });
    } else {
      // Gerekli alanlar doldurulmamışsa kullanıcıya uyarı verebilirsiniz
      alert('Lütfen gerekli alanları doldurun.');
    }
  }
}
