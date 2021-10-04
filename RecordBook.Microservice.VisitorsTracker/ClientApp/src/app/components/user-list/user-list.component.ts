import { Component, Input, NgIterable } from '@angular/core';
import { UserProfile } from 'src/app/models/user.profile.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent{
  @Input() users: NgIterable<UserProfile> | any;

  constructor() { }

}
