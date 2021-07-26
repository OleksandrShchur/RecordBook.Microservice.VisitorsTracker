import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserLogin } from 'src/app/models/user.login.model';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _userService: UserService;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string = '';

  constructor(userService: UserService) {
    this._userService = userService;
   }

  loginUser() {
    let user = new UserLogin;
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;

    this._userService.post("User/Login", user).subscribe(
      (data: any) => {
        console.log(data);
        this.message = "Login success";
      },
      error => console.log(error)
    );
  }
}
