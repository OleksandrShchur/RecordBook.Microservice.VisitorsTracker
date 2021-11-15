import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/userService';
import { UserLogin } from 'src/app/models/user.login.model';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user.profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Duration } from 'src/app/constants/snackBarDuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public message: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  loginUser() {
    let user = new UserLogin();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;


    this.userService.loginUser(user).subscribe(
      (data: UserProfile) => {
        this.message = "Login success";
        this.userService.setUser(data);

        this.router.navigate(['profile']);

        this.snackBar.open('Login successful', 'Dismiss', {
          duration: Duration
        });
      },
      error => {
        this.snackBar.open('Failed to login. ' + error.message, 'Dismiss', {
          duration: Duration
        });
      }
    );
  }
}
