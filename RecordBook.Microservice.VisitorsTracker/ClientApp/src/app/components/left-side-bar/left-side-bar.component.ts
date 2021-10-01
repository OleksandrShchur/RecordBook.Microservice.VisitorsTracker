import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserProfile } from 'src/app/models/user.profile.model';
import { UserService } from 'src/app/services/userService';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDefaultImage } from 'src/app/constants/userDefaultImage';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmLogoutComponent } from '../dialog-confirm-logout/dialog-confirm-logout.component';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public user: UserProfile;

  constructor(private observer: BreakpointObserver, 
    private userService: UserService,
    private sanitizer:DomSanitizer,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  getUser() {
    return this.userService.getUser();
  }

  isAuthorized() {
    return this.userService.isLoggedIn();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  getNameOfUser() {
    return this.userService.getUser().email.match(/^([^@]*)@/)[1];
  }

  getAvatar() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(UserDefaultImage);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmLogoutComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
