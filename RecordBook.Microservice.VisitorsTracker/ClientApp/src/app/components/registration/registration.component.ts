import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';
import { UserRegistration } from 'src/app/models/user.registration.model';
import { genders } from 'src/app/constants/genders';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public genderTypes = genders;
  public selectedGender = 'Undefined';

  public profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl(''),
  });

  private readonly snackBarDuration = 10000;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  submitUser() {
    let user = new UserRegistration();

    user.email = this.profileForm.value.email;
    user.phone = this.profileForm.value.phone;
    user.birthday = this.profileForm.value.birthday;
    user.password = this.profileForm.value.password;
    user.gender = genders.indexOf(this.profileForm.value.gender);

    this.userService.registerUser(user).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['profile']);

        this.userService.setUser(data);

        this.snackBar.open('Registration successful', 'Dismiss', {
          duration: this.snackBarDuration
        });
      },
      error => {
        this.snackBar.open('Registration failed. ' + error.message, 'Dismiss', {
          duration: this.snackBarDuration
        });
      }
    );
  }
}
