import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group.info.model';
import { GroupService } from 'src/app/services/groupService';
import { Duration } from 'src/app/constants/snackBarDuration';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/userService';
import {MatDialog} from '@angular/material/dialog';
import { GroupAddMemberModalComponent } from '../group-add-member-modal/group-add-member-modal.component';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {
  public displayedColumns: string[] = ['email', 'roles'];
  private group: GroupInfo;
  public dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.groupService.getGroupById(params.groupId)
          .subscribe(
            (data: GroupInfo) => {
              this.group = data;
            },
            error => {
              this.snackBar.open('Failed to load group. ' + error.message, 'Dismiss', {
                duration: Duration
              });
            }
          )
      }
      )
  }

  openDialog() {
    this.dialog.open(GroupAddMemberModalComponent);
  }

}
