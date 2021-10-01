import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/userService';
import { UserLogin } from 'src/app/models/user.login.model';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user.profile.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _userService: UserService;
  private _router: Router;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string = '';

  constructor(userService: UserService, router: Router) {
    this._userService = userService;
    this._router = router;
  }

  loginUser() {
    let user = new UserLogin;
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;


    this._userService.loginUser(user).subscribe(
      (data: UserProfile) => {
        this.message = "Login success";
        this._router.navigate(['profile']);
        
        this._userService.setUser(data);
        console.log(sessionStorage.getItem('userLoggedIn'));
      },
      error => console.log(error)
    );
  }
}
