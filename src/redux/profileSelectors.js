export const getPosts = (state) => {
    return state.profilePage.posts;
};

export const getProfile = (state) => {
    return state.profilePage.profile;
};

export const getProfileStatus = (state) => {
    return state.profilePage.status;
};

export const getIsUpdatingStatus = (state) => {
    return state.profilePage.isUpdatingStatus;
};

export const getIsUpdatingUserProfile = (state) => {
    return state.profilePage.isUpdatingUserProfile;
};

export const getIsUpdatingUserPhoto = (state) => {
    return state.profilePage.isUpdatingUserPhoto;
};