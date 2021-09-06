import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/userService';
import { AppGlobalState } from 'src/app/app.global.state';
import { UserLogin } from 'src/app/models/user.login.model';
import { Router } from '@angular/router';

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


    this._userService.post("User/Login", user).subscribe(
      (data: any) => {
        console.log(data);
        this.message = "Login success";
        this._router.navigate(['profile']);
        sessionStorage.setItem('userLoggedIn', data);
        console.log(sessionStorage.getItem('userLoggedIn'));
      },
      error => console.log(error)
    );
  }
}
