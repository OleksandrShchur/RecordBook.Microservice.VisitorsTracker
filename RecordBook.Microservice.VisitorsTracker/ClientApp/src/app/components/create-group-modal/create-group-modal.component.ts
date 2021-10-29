import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { Duration } from 'src/app/constants/snackBarDuration';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.css']
})
export class CreateGroupModalComponent implements OnInit { // add available curators to the group at the step of creating
  public group: Group;

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createGroup() {
    this.groupService.createGroup(this.group.number)
      .subscribe(
        (data: any) => {
          this.group = data;

          this.snackBar.open('Group created successfully', 'Dismiss', {
            duration: Duration
          });

          this.dialog.closeAll();

          this.router.navigate(['group'], { queryParams: { groupId: this.group.id } });
        },
        error => {
          this.snackBar.open('Creating group failed. ' + error.message, 'Dismiss', {
            duration: Duration
          });
        }
      )
  }

}
