import { Role } from "./role.model";

export class UserProfile {
    id: string;
    email: string;
    phone: string;
    birthday: Date;
    roles: Array<Role>;
    groups: Array<string>;
    avatar: string;
    gender: number;
}