import { BaseService } from "./baseService";
import { UserProfile } from "../models/user.profile.model";
import { UserLogin } from "../models/user.login.model";
import { UserRegistration } from "../models/user.registration.model";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService extends BaseService {
    private user: UserProfile = JSON.parse(sessionStorage.getItem('userLoggedIn')); // в конструкторі взяти юзера якщо є, інакше setUser
    private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedInStatus') || 'false');

    isLoggedIn() {
        return JSON.parse(sessionStorage.getItem('loggedInStatus') || this.loggedInStatus.toString());
    }

    setUser(data: UserProfile) {
        if(this.user === null) {
            this.user = data;
        }
        sessionStorage.setItem('userLoggedIn', JSON.stringify(data));
        this.loggedInStatus = true;
        sessionStorage.setItem('loggedInStatus', 'true');
    }

    getUser() {
        return this.user;
    }

    logoutUser() {
        sessionStorage.clear();
        this.loggedInStatus = false;
        this.user = null;
    }
    
    loginUser(body: UserLogin) {
        return this.http.post<UserProfile>(this.baseUrl + 'User/Login', body);
    }

    register(body: UserRegistration) {
        return this.http.post<UserProfile>(this.baseUrl + 'User/Register', body);
    }
}