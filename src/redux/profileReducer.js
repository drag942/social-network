import {profileApi, usersApi} from "../api/api";

const initialState = {
   posts: [
       {
           id:1,
           message: "Hi, how are you?",
       },
       {
           id:2,
           message: "It's my first post",
       },

   ],
    profile: null,
    status: '',
    isUpdatingStatus: false,
    isUpdatingUserProfile: false,
    isUpdatingUserPhoto: false,
};

const ADD_POST = 'profileReducer/ADD_POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const UPDATE_USER_STATUS = 'profileReducer/UPDATE_USER_STATUS';
const GET_USER_STATUS = 'profileReducer/GET_USER_STATUS';
const TOGGLE_UPDATING_STATUS = 'profileReducer/TOGGLE_UPDATING_STATUS';
const UPDATING_USER_PROFILE = 'profileReducer/UPDATING_USER_PROFILE';
const UPDATE_USER_PHOTOS = 'profileReducer/UPDATE_USER_PHOTOS';
const TOGGLE_UPDATING_USER_PHOTO = 'profileReducer/TOGGLE_UPDATING_USER_PHOTO';

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.payload}],
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload,
            }
        }

        case UPDATE_USER_STATUS: {
            return {
                ...state,
                status: state.status,
            }
        }

        case GET_USER_STATUS: {
            return {
                ...state,
                status: action.payload,
            }
        }

        case TOGGLE_UPDATING_STATUS: {
            return {
                ...state,
                isUpdatingStatus: action.payload,
            }
        }

        case UPDATING_USER_PROFILE: {
            return {
                ...state,
                isUpdatingUserProfile: action.payload,
            }
        }
        case UPDATE_USER_PHOTOS : {
            return {
                ...state,
                profile: {...state.profile, photos: action.payload}
            }
        }

        case TOGGLE_UPDATING_USER_PHOTO: {
            return {
                ...state,
                isUpdatingUserPhoto: action.payload,
            }
        }


        default: return state;
    }
};

export const addPost = (payload) => ({
    type: ADD_POST,
    payload,
});

const setUserProfile = (payload) => ({
    type: SET_USER_PROFILE,
    payload,
});

const updateUserStatus = () => ({
    type: UPDATE_USER_STATUS,
});

const getUserStatus = (payload) => ({
    type: GET_USER_STATUS,
    payload,
});

const toggleUpdatingStatus = (payload) => ({
    type: TOGGLE_UPDATING_STATUS,
    payload,
});

const updatingUserProfile = (payload) => ({
    type: UPDATING_USER_PROFILE,
    payload,
});

const updateUserPhotos = (payload) => ({
    type: UPDATE_USER_PHOTOS,
    payload,
});

const toggleUpdatingUserPhoto = (payload) => ({
    type: TOGGLE_UPDATING_USER_PHOTO,
    payload,
});


export const setUserProfileAsyncAction = (userId) => {
    return async (dispatch) => {
        dispatch(updatingUserProfile(true));
        const response = await usersApi.getUserProfile(userId);
        dispatch(setUserProfile(response));
        dispatch(updatingUserProfile(false));
    }
};

export const getUserStatusAsyncAction = (userId) => {
    return async (dispatch) => {
        const response = await profileApi.getUserStatus(userId);
        dispatch(getUserStatus(response))
    }
};

export const updateUserStatusAsyncAction = (status) => {
    return async (dispatch) => {
        dispatch(toggleUpdatingStatus(true));
        const response = await profileApi.updateUserStatus(status);
        if(response.resultCode === 0) {
            dispatch(updateUserStatus());
            dispatch(toggleUpdatingStatus(false));
        }
    }
};

export const updatePhotoAsyncAction = (photoFile) => {
    return async (dispatch) => {
        dispatch(toggleUpdatingUserPhoto(true));
        try {
            const response = await profileApi.uploadMainPhoto(photoFile);
            if(response.resultCode === 0) {
                dispatch(updateUserPhotos(response.data.photos));
            }
        }catch (e) {
            console.log(e);
        }
        dispatch(toggleUpdatingUserPhoto(false));
    }
};

export const updateProfileInfo = (profile) => {
    return async (dispatch) => {

        try {
            const response = await profileApi.updateProfileInfo(profile);
            if(response.resultCode === 0) {
                dispatch(setUserProfileAsyncAction(profile.userId));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
};

export default profileReducer;