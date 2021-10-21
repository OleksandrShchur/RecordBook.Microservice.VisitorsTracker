import { Role } from "./role.model";

export class UserList {
    id: string;
    email: string;
    roles: Array<Role>;
    avatar: string;
}