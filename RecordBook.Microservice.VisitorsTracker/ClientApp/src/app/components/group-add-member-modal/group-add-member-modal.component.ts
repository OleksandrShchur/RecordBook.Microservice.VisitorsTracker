import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserList } from 'src/app/models/user.list.model';
import { UserService } from 'src/app/services/userService';
import { Duration } from 'src/app/constants/snackBarDuration';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-group-add-member-modal',
  templateUrl: './group-add-member-modal.component.html',
  styleUrls: ['./group-add-member-modal.component.css']
})
export class GroupAddMemberModalComponent {

  public displayedColumns: string[] = ['email', 'roles'];
  private userList: Array<UserList>;
  public dataSource: any;
  public selection = new SelectionModel<UserList>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(
      (data: Array<UserList>) => {
        this.userList = data;
        this.dataSource = new MatTableDataSource<UserList>(this.userList);

        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.snackBar.open('Failed to get list of users. ' + error.message, 'Dismiss', {
          duration: Duration
        });
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: UserList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

}
