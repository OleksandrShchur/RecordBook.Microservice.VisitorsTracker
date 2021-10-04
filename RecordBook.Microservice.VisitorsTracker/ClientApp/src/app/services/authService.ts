import { BaseService } from "./baseService";
import { HttpHeaders } from "@angular/common/http";

export class AuthService extends BaseService {

    get = (url: string, headers: HttpHeaders) =>
        this.http.get(this.baseUrl + url, {
            headers: headers
        })
    
    post = (url: string, body: string, options: object) =>
        this.http.post(this.baseUrl + url, body, options)
}