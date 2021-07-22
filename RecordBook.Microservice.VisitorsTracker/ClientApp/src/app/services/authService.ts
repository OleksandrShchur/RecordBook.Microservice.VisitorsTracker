import BaseService from "./baseService";
import { HttpHeaders } from "@angular/common/http";

export default class AuthService extends BaseService {

    get = (url: string, headers: HttpHeaders) =>
        this._http.get(this._baseUrl + url, {
            headers: headers
        })
    
    post = (url: string, body: string, options: object) =>
        this._http.post(this._baseUrl + url, body, options)
}