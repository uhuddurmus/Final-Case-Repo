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
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService,
    private UserService: UserServiceService
  ) {}
  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.storage.saveUser(data.response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Error', err.error.message);
        this.toastr.error(err.error.message, 'Error');
      },
    })


     //this.authService.login();
  }
}
