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

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string = '';

  constructor(private userService: UserService,
    private router: Router) {
  }

  loginUser() {
    let user = new UserLogin;
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;


    this.userService.loginUser(user).subscribe(
      (data: UserProfile) => {
        this.message = "Login success";
        this.router.navigate(['profile']);
        
        this.userService.setUser(data);
      },
      error => console.log(error)
    );
  }
}
