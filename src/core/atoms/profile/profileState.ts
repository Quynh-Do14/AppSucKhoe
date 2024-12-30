import { atom } from 'recoil';

interface ProfileStateType {
    isLoading?: boolean;
    uri?: string;
    data: any;
}

export const ProfileState = atom<ProfileStateType>({
    key: 'PROFILE_STATE',
    default: {
        data: {
            message: "",
            user: {}
        }
    }
});
