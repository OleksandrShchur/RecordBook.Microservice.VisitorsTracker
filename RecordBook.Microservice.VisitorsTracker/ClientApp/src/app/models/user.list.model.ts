import { Role } from "./role.model";

export interface UserList {
    id: string;
    email: string;
    roles: Array<Role>;
    avatar: string;
}