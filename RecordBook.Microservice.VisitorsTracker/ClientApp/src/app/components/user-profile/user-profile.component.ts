import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private userFromDb = new UserProfile();
  
  private readonly guest: string = "Guest";

  userList: UserProfile | any;

  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.userFromDb = this.userService.getUser();
  }

  getEmail() {
    return this.userFromDb.email;
  }

  getPhone() {
    return this.userFromDb.phone;
  }

  getBirthday() {
    return new Date(this.userFromDb.birthday).toDateString();
  }

  getRoleNames() {
    return this.userFromDb.roles.map(x => x.name);
  }

  getGroups() {
    return this.userFromDb.groups;
  }

  // check if user is only in role Guest
  isGuestOnly() {
    return this.userFromDb.roles.some(x => x.name === this.guest) && this.userFromDb.roles.length === 1;
  }

  getNameOfUser() {
    return this.userFromDb.email.match(/^([^@]*)@/)[1];
  }
}
