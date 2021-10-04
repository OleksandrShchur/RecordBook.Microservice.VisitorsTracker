import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  public message: string = "";
  private _accessToken: string = '';
  private _authService: AuthService;
  public done: Boolean = false;

  constructor(private http: HttpClient, authService: AuthService) {
    this._authService = authService;

    this.message = "User not logged in";
  }

  login(): void {
    this.getToken();

    const header = new HttpHeaders().set('Authorization', "Bearer " + this._accessToken);

    this._authService.get("Auth/Login", header).subscribe((data: any) => {
      this.message = 'Login success';
      this.done = true;
    },
      (      error: any) => {
        console.log(error);
        this.message = 'Login failed';
      });
  }

  getToken(): void {
    let body = new URLSearchParams();
    body.set("client_id", "stud");
    body.set("client_secret", "secret");
    body.set("grant_type", "client_credentials");
    body.set("scope", "api");

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post("https://localhost:44327/connect/token", body.toString(), options).subscribe(
      (data: any) => {
        this._accessToken = data.access_token;
        this.message = "Token received";
      },
      error => console.log(error)
    );
  }
}
