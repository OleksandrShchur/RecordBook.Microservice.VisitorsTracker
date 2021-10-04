import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-dialog-confirm-logout',
  templateUrl: './dialog-confirm-logout.component.html',
  styleUrls: ['./dialog-confirm-logout.component.css']
})
export class DialogConfirmLogoutComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmLogoutComponent>,
    private userService: UserService,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['home']);
    this.dialogRef.close();
  }
}