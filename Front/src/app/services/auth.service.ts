import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
const AUTH_API = 'https://localhost:50000/vk/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  register(userDetails: any): Observable<any> {
    return this.http.post(AUTH_API + 'Users', userDetails, httpOptions);
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'Token',
      {
        email,
        password,
      },
      httpOptions
    );
  }
  logOut() {
    this.storage.clean();
    window.location.href = '/#/login';
  }

  isLoggin() {
    let user = this.storage.getUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
