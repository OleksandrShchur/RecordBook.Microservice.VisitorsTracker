import { UserProfile } from "./user.profile.model";

export class GroupInfo {
    id: string;
    groupNumber: string;
    users: Array<UserProfile>
}