import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/user.profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public showListOfUsers: Boolean = false;

  userList: UserProfile | any;

  constructor(private http: HttpClient) { }

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
