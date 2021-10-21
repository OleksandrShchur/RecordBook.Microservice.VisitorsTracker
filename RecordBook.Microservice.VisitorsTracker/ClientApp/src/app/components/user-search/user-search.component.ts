import { Component, ViewChild } from '@angular/core';
import { UserList } from 'src/app/models/user.list.model';
import { UserService } from 'src/app/services/userService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent{
  displayedColumns: string[] = ['email', 'roles'];
  private userList: Array<UserList>;
  public dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(
      (data: Array<UserList>) => {
        this.userList = data;
        this.dataSource = new MatTableDataSource<UserList>(this.userList);
      },
      error => console.log(error)
    );
  }

  getUserRoleNames(id: string) {
    return this.userList.find(x => x.id === id).roles.map(x => x.name);
  }

  getRecord(row: any) {
    this.router.navigate(['user'], { queryParams: { id: row.id} });
  }

}
