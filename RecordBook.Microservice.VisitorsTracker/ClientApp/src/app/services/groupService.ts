import { BaseService } from "./baseService";
import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";
import { HttpHeaders } from "@angular/common/http";
import { GroupInfo } from "../models/group.info.model";

@Injectable()
export class GroupService extends BaseService {

    getAllGroups() {
        return this.http.get<Array<Group>>(this.baseUrl + "Group/GetAll");
    }

    createGroup(groupNumber: any) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        return this.http.post(this.baseUrl + "Group/AddGroup", groupNumber, { headers: headers });
    }

    getGroupById(id: string) {
        return this.http.get<GroupInfo>(this.baseUrl + "Group/GetById?id=" + id);
    }
}