import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GroupInfo } from 'src/app/models/group.info.model';
import { GroupService } from 'src/app/services/groupService';
import { Duration } from 'src/app/constants/snackBarDuration';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {
  private group: GroupInfo;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private groupService: GroupService) { }

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

}
