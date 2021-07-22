import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public showListOfUsers: Boolean = false;
  profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
  });

  userList: User | any;

  constructor(private http: HttpClient) { }

  submitUser() {
    let user = new User();
    user = this.profileForm.value;
    console.log(user);

    this.http.post("https://localhost:44335/api/User/AddUser", user).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => console.log(error)
    );
  }

  getListOfUsers() {
    this.http.get("https://localhost:44335/api/User/GetUsers").subscribe(
      (data: any) => {
        this.userList = data;
        this.showListOfUsers = true;
      },
      error => console.log(error)
    );
  }
}
