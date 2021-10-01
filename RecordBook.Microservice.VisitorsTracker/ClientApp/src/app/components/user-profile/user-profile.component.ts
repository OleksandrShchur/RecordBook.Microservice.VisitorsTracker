import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserDefaultImage } from 'src/app/constants/userDefaultImage';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/userService';
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public showListOfUsers: Boolean = false;
  private userFromDb = new UserProfile;

  userList: UserProfile | any;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private userService: UserService) { }

  ngOnInit() {
    this.userFromDb = this.userService.getUser();
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

  getAvatar = () => this.sanitizer.bypassSecurityTrustResourceUrl(UserDefaultImage);

  getEmail = () => this.userFromDb.email;

  getPhone = () => this.userFromDb.phone;

  getBirthday = () => new Date(this.userFromDb.birthday).toDateString();

  getRoles = () => this.userFromDb.roles;

  getGroups = () => this.userFromDb.groups;
}
