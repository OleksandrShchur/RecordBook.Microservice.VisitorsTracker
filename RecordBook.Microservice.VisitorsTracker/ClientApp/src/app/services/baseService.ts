import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export default class BaseService {
    protected _baseUrl: string = 'https://localhost:44335/api/';
    protected _authUrl: string = "https://localhost:44327/";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }
}