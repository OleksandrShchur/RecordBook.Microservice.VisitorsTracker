import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import AuthService from './services/authService';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import BaseService from './services/baseService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserProfileComponent,
    UserListComponent,
    LoginComponent,
    LogoutComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule
  ],
  providers: [BaseService, AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
