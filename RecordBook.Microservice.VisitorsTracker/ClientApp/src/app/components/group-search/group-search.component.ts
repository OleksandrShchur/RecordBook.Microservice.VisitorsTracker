import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})
export class GroupSearchComponent implements OnInit {
  public groupList: Array<Group>;
  public searchText: string;
  private readonly snackBarDuration = 10000;

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.groupService.getAllGroups()
      .subscribe(
        (data: Array<Group>) => {
          this.groupList = data;
        },
        error => {
          this.snackBar.open('Get list of groups failed. ' + error.message, 'Dismiss', {
            duration: this.snackBarDuration
          });
        }
      )
  }

  openDialog() {
    this.dialog.open(CreateGroupModalComponent);
  }

  getGroupInfo(id: string) {
    this.router.navigate(['group'], { queryParams: { groupId: id } })
  }
}
