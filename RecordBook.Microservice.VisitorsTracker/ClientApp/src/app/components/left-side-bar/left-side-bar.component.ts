import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AppGlobalState } from 'src/app/app.global.state';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public user;
  public authorized;

  constructor(private observer: BreakpointObserver) {
    this.user = AppGlobalState.user;
    this.authorized = AppGlobalState.authorized;
  }

  ngOnInit() {
    this.user = AppGlobalState.user;
    this.authorized = AppGlobalState.authorized;
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
}
