import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private router: Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  checkSession() {

    const expiryTime = sessionStorage.getItem('expiryTime');

    if (!expiryTime) {
      this.logout();
      return;
    }

    if (Date.now() > Number(expiryTime)) {

      this.logout();
      alert('Session Expired');

    }
  }
}
