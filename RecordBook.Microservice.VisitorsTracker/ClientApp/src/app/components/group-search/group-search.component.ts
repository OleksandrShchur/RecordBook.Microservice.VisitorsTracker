import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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

}
