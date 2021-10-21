import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';
import { ActivatedRoute } from '@angular/router';
import { UserDefaultImage } from 'src/app/constants/userDefaultImage';
import { DomSanitizer } from '@angular/platform-browser';
import { genders } from 'src/app/constants/genders';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { RoleService } from 'src/app/services/roleService';
import { Role } from 'src/app/models/role.model';
import { COMMA, ENTER, R } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public userData: UserProfile;
  public selectableRoles = true;
  public removableRoles = true;
  public roleControl = new FormControl();
  public roles: string[];
  public allRoles: string[];

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let id = params.id;

        this.userService.getUserById(id)
          .subscribe(
            (data: UserProfile) => {
              this.userData = data;

              this.roles = this.userData.roles.map(x => x.name);
            }
          );
      });

    this.roleService.getAllRoles()
      .subscribe(
        (data: Array<Role>) => {
          this.allRoles = data.map(x => x.name);
        }
      );
  }

  removeRole(role: string) {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selectedRole(event: MatAutocompleteSelectedEvent) {
    if (!this.roles.includes(event.option.viewValue)) {
      this.roles.push(event.option.viewValue)
    }

    this.roleInput.nativeElement.value = '';
    this.roleControl.setValue(null);
  }

  getAvatar() {
    return this.userData.avatar === null
      ? this.sanitizer.bypassSecurityTrustResourceUrl(UserDefaultImage)
      : this.userData.avatar;
  }

  getUserName() {
    return this.userData.email.match(/^([^@]*)@/)[1];
  }

  getUserGender() {
    return genders[this.userData.gender];
  }

  saveChangedRoles() {
    let newRoles = this.roles.filter(x => !this.userData.roles.map(r => r.name).includes(x));

    console.log(newRoles);
  }
}
