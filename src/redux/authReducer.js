import {authApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuthorizing: false,
    isAuth: false,
    authProfile: null,
};

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const TOGGLE_AUTHORIZING_USER = 'authReducer/TOGGLE_AUTHORIZING_USER';
const SET_AUTH_PROFILE = 'authReducer/SET_AUTH_PROFILE';


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }

        case TOGGLE_AUTHORIZING_USER: {
            return {
                ...state,
                isAuthorizing: action.payload,
            }
        }

        case SET_AUTH_PROFILE: {
            return {
                ...state,
                authProfile: action.payload,
            }
        }

        default: return state;
    }
};


const setUserData = (payload) => ({
    type: SET_USER_DATA,
    payload,
});

const toggleAuthorizingUser = (payload) => ({
    type: TOGGLE_AUTHORIZING_USER,
    payload,
});

const setAuthProfile = (payload) => ({
    type: SET_AUTH_PROFILE,
    payload,
});


export const authUserAsyncAction = () => {
    return async (dispatch) => {
        const response = await authApi.authorizationUser();
        if (response.resultCode === 0) {
            dispatch(setUserData({...response.data, isAuth: true}));
            dispatch(getAuthUserProfile(response.data.id));
        }
    }
};

export const loginUserAsyncAction = (email, password, isRemember) => {
    return async (dispatch) => {
        dispatch(toggleAuthorizingUser(true));
        const response = await authApi.loginUser(email, password, isRemember);
        if (response.resultCode === 0) {
            await dispatch(authUserAsyncAction());
            dispatch(toggleAuthorizingUser(false));
        }
        else {
            await dispatch(stopSubmit('login', {_error: response.messages[0]}));
            dispatch(toggleAuthorizingUser(false));
        }
    }
};

export const logoutUserAsyncAction = () => {
    return async (dispatch) => {
        const response = await authApi.logoutUser();
        if (response.resultCode === 0) {
            dispatch(setUserData({id: null, email: null, login: null, isAuth: false}));
        }
    }
};

const getAuthUserProfile = (userId) => {
    return async (dispatch) => {
        const response = await usersApi.getUserProfile(userId);
        if (response) {
            debugger;
            dispatch(setAuthProfile(response));
        }
    }
};


export default authReducer;