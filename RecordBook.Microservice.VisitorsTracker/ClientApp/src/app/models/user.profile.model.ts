import { UserLogin } from "./user.login.model";

export class UserProfile {
    email: string | undefined;
    phone: string | undefined;
    birthday: Date | undefined;
    roles: Array<string> | undefined;
    groups: Array<string> | undefined;
    avatar: string | undefined; 
    id: string | undefined;
    password: string | undefined;
}