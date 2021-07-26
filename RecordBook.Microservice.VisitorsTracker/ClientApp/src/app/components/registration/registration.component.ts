import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  private _userService: UserService;

  profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    password: new FormControl(''),
  });

  public message: string = "";

  constructor(userService: UserService) {
      this._userService = userService;
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
      },
      error => console.log(error)
    );
  }
}
