import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';
import { AppGlobalState } from 'src/app/app.global.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  private _userService: UserService;
  private _router: Router;

  profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string = "";

  constructor(userService: UserService, router: Router) {
      this._userService = userService;
      this._router = router;
    }

  submitUser() {
    let user = new UserProfile();

    user.email = this.profileForm.value.email;
    user.phone = this.profileForm.value.phone;
    user.birthday = this.profileForm.value.birthday;
    user.password = this.profileForm.value.password;

    this._userService.post('User/AddUser', user).subscribe(
      (data: any) => {
        console.log(data);
        this.message = "User added";

        this._router.navigate(['profile']);
        sessionStorage.setItem('userLoggedIn', data);
      },
      error => console.log(error)
    );
  }
}
