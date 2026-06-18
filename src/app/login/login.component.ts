import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../config/auth.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  

export class LoginComponent {

  constructor(private router : Router){};

   loginObj = {
    username: '',
    password: ''
  };

  onLogin() {

  // Validate user
  const userExists = USERS.some(
  user =>
    user.username === this.loginObj.username &&
    user.password === this.loginObj.password
);


  if (userExists) {

  const expiryTime =
    Date.now() + (60 * 60 * 1000);

  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('expiryTime', expiryTime.toString());

  this.router.navigate(['/menu']);

} else {

  alert('Invalid Username or Password');

}


  }

}
