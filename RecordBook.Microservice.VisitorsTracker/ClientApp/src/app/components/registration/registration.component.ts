import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';
import { UserRegistration } from 'src/app/models/user.registration.model';
import { genders } from 'src/app/constants/genders';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl(''),
  });

  public message: string = "";

  constructor(private userService: UserService, 
    private router: Router) { }

  submitUser() {
    let user = new UserRegistration();

    user.email = this.profileForm.value.email;
    user.phone = this.profileForm.value.phone;
    user.birthday = this.profileForm.value.birthday;
    user.password = this.profileForm.value.password;

    this.userService.registerUser(user).subscribe(
      (data: any) => {
        console.log(data);
        this.message = "Registration successful";
        this.router.navigate(['profile']);
        
        this.userService.setUser(data);
      },
      error => console.log(error)
    );
  }
}
