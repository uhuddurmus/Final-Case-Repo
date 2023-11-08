import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  product: any = {
    email: '',
    password: '',
    fullName: '',
    profit: 20,
    role: 'user',
    credit: 5,
  };
  emailisvalid: any = null;
  constructor(
    private AuthService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uemail(str: any) {
    this.product.email = str;
    this.emailisvalid = this.validateEmail(this.product.email);
  }
  upassword(str: any) {
    this.product.password = str;
  }
  ufullName(str: any) {
    this.product.fullName = str;
  }
  validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  Create() {
    console.log(this.product);
    this.AuthService.register(this.product).subscribe({
      next: (data) => {
        this.toastr.success('Account Created');
        this.router.navigate([`/login`]); // Replace 'product' with the actual route path to your product page
      },
      error: (err) => {
        this.toastr.error('Err', err.errors);
        console.log(err);
      },
    });
  }
}
