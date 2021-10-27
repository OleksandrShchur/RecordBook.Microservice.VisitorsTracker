import { BaseService } from "./baseService";
import { UserProfile } from "../models/user.profile.model";
import { UserLogin } from "../models/user.login.model";
import { UserRegistration } from "../models/user.registration.model";
import { Injectable } from "@angular/core";
import { UserList } from "../models/user.list.model";

@Injectable()
export class UserService extends BaseService {
    private user: UserProfile = JSON.parse(sessionStorage.getItem('userLoggedIn'));
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

    registerUser(body: UserRegistration) {
        return this.http.post<UserProfile>(this.baseUrl + 'User/AddUser', body);
    }

    getUserList() {
        return this.http.get<Array<UserList>>(this.baseUrl + 'User/GetUsers');
    }

    getUserById(id: string) {
        return this.http.get<UserProfile>(this.baseUrl + 'User/GetUserById/' + id);
    }

    deleteUser(id: string) {
        return this.http.delete(this.baseUrl + "User/DeleteUser/" + id);
    }
}