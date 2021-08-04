import { UserProfile } from "../app/models/user.profile.model";

export class AppGlobalState {
    public static authorized: boolean = false;
    public static user: UserProfile;
}