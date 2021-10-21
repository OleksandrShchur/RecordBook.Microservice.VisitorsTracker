import { BaseService } from "./baseService";
import { Injectable } from "@angular/core";
import { Role } from "../models/role.model";

@Injectable()
export class RoleService extends BaseService {
    
    getAllRoles() {
        return this.http.get<Array<Role>>(this.baseUrl + 'Role/GetAllRoles');
    }
}