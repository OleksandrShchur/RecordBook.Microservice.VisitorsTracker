import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BaseService } from './services/baseService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserService } from './services/userService';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpComponent } from './components/help/help.component';
import { DialogConfirmLogoutComponent } from './components/dialog-confirm-logout/dialog-confirm-logout.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RoleService } from './services/roleService';
import { GroupSearchComponent } from './components/group-search/group-search.component';
import { GroupService } from './services/groupService';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { GroupAddMemberModalComponent } from './components/group-add-member-modal/group-add-member-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    LeftSideBarComponent,
    RegistrationComponent,
    HomeComponent,
    AboutUsComponent,
    HelpComponent,
    DialogConfirmLogoutComponent,
    UserSearchComponent,
    UserInfoComponent,
    GroupSearchComponent,
    CreateGroupModalComponent,
    GroupInfoComponent,
    GroupAddMemberModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    Ng2SearchPipeModule,
    MatCheckboxModule
  ],
  providers: [
    HttpClient,
    BaseService,
    UserService,
    RoleService,
    GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
