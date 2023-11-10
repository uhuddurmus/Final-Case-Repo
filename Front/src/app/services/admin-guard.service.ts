import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
