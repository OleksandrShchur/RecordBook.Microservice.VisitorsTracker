export class UserProfile {
    id: string;
    email: string;
    phone: string;
    birthday: Date;
    roles: Array<string>;
    groups: Array<string>;
    avatar: string;
    gender: number;
}