import { Component, ViewChild } from '@angular/core';
import { UserList } from 'src/app/models/user.list.model';
import { UserService } from 'src/app/services/userService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
  displayedColumns: string[] = ['email', 'roles'];
  private userList: Array<UserList>;
  public dataSource: any;
  private snackBarDuration = 10000;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(
      (data: Array<UserList>) => {
        this.userList = data;
        this.dataSource = new MatTableDataSource<UserList>(this.userList);
      },
      error => {
        this.snackBar.open('Failed to get list of users. ' + error.message, 'Dismiss', {
          duration: this.snackBarDuration
        });
      }
    );
  }

  getUserRoleNames(id: string) {
    return this.userList.find(x => x.id === id).roles.map(x => x.name);
  }

  getRecord(row: any) {
    this.router.navigate(['user'], { queryParams: { id: row.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortDataSource(sortState: Sort) {
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

}
