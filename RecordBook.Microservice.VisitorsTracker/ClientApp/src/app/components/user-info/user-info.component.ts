import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDefaultImage } from 'src/app/constants/userDefaultImage';
import { DomSanitizer } from '@angular/platform-browser';
import { genders } from 'src/app/constants/genders';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RoleService } from 'src/app/services/roleService';
import { Role } from 'src/app/models/role.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Duration } from 'src/app/constants/snackBarDuration';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public userData: UserProfile;
  public roleControl = new FormControl();
  public roles: string[];
  public allRoles: Array<Role>;
  public isChanged: Boolean;

  private currectUser: UserProfile;
  private readonly canEditRole: string = "Admin";

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private snackBar: MatSnackBar) { }

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
          this.allRoles = data;
        }
      );

    this.currectUser = this.userService.getUser();
    this.isChanged = false;
  }

  removeRole(role: string) {
    const index = this.roles.indexOf(role);

    if (index >= 0 && this.roles.length > 1) {
      this.roles.splice(index, 1);
      this.isChanged = true;
    }
  }

  selectedRole(event: MatAutocompleteSelectedEvent) {
    if (!this.roles.includes(event.option.viewValue)) {
      this.roles.push(event.option.viewValue);
      this.isChanged = true;
    }

    this.roleInput.nativeElement.value = '';
    this.roleControl.setValue(null);
  }

  getAvatar() {
    return this.userData?.avatar === null
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
    let userRoles = this.allRoles.filter(x => this.roles.includes(x.name));

    let user = {
      "id": this.userData.id,
      "roles": userRoles
    }

    this.roleService.saveUserRoleChanges(user).subscribe(
      () => {
        this.snackBar.open('Changes saved', 'Dismiss', {
          duration: Duration
        });
      },
      error => {
        this.snackBar.open('Failed to save. ' + error.message, 'Dismiss', {
          duration: Duration
        });
      }
    );

    this.isChanged = false;
  }

  canDeleteUser() {
    return this.currectUser.id !== this.userData.id && this.canEditUser();
  }

  canEditUser() {
    return this.currectUser.roles.filter(x => x.name === this.canEditRole).length === 1;
  }

  deleteUser() {
    this.userService.deleteUser(this.userData.id).subscribe( // check
      () => {
        this.router.navigate(['users']);
        this.snackBar.open('User deleted', 'Dismiss', {
          duration: Duration
        });
      },
      error => {
        this.snackBar.open('Failed to delete. ' + error.message, 'Dismiss', {
          duration: Duration
        });
      }
    );
  }

  getAvailableRoles() {
    return this.roles.filter(x => !this.userData.roles.map(r => r.name).includes(x));
  }
}
