import { Injectable } from '@angular/core';
import { cibWindows } from '@coreui/icons';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean() {
    window.sessionStorage.clear();
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem('auth');
    window.sessionStorage.setItem('auth', JSON.stringify(user));
  }

  public saveUserInfo(user: any): void {
    window.sessionStorage.removeItem('userInfo');
    window.sessionStorage.setItem('userInfo', JSON.stringify(user));
  }
  public getUserInfo(): any {
    const userData = window.sessionStorage.getItem('userInfo');
    if (userData) {
      return JSON.parse(userData);
    }
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem('auth');
    if (user) {
      return JSON.parse(user);
    }
  }
  public getToken(): string {
    const stringifyUser: any = window.sessionStorage.getItem('auth');
    if (stringifyUser) {
      const user = JSON.parse(stringifyUser);
      const token = user.token;
      return token;
    } else {
      return '';
    }
  }
}
