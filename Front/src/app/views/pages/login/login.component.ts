import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isMail: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService,
    private UserService: UserServiceService
  ) {}
  validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  upassword(str: any) {
    this.isMail = this.validateEmail(str);
  }
  onSubmit() {
    console.log('submit');
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.storage.saveUser(data.response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('err', err);
        this.toastr.error('Error');
        this.storage.clean();
      },
    });
    this.isMail = null;

    //this.authService.login();
  }
}
