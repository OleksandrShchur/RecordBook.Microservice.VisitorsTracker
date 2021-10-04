import { UserProfile } from "../app/models/user.profile.model";

export abstract class AppGlobalState {
    public static authorized: boolean = false;
    public static user: UserProfile;
}