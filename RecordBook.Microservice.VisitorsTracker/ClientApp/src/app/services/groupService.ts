import { BaseService } from "./baseService";
import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";

@Injectable()
export class GroupService extends BaseService {
    
    getAllGroups() {
        return this.http.get<Array<Group>>(this.baseUrl + "Group/GetAll");
    }

    createGroup(number: string) {
        return this.http.post(this.baseUrl + "Group/AddGroup", number);
    }
}