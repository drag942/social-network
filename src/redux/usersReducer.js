
import {updateObjectInArray} from "../utils/objects-helpers";
import {usersApi} from "../api/api";


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
};

const SET_USERS = 'usersReducer/SET_USERS';
const FOLLOW_USER = 'usersReducer/FOLLOW_USER';
const UNFOLLOW_USER = 'usersReducer/UNFOLLOW_USER';
const SET_PAGE = 'usersReducer/SET_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_FOLLOWING_USER = 'usersReducer/TOGGLE_FOLLOWING_USER';
const TOGGLE_FETCHING_USERS = 'usersReducer/TOGGLE_FETCHING_USER';


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.payload],
            }
        }

        case FOLLOW_USER: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {followed: true}),
            }
        }

        case UNFOLLOW_USER: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {followed: false}),
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                currentPage: action.payload,
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.payload,
            }
        }

        case TOGGLE_FOLLOWING_USER: {
            return {
                ...state,
                isFollowingInProgress: action.payload.isFetching ? [...state.isFollowingInProgress, action.payload.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.payload.userId),
            }
        }

        case TOGGLE_FETCHING_USERS : {
            return {
                ...state,
                isFetching: action.payload,
            }
        }

        default: return state;
    }
};

const setUsers = (payload) => ({
    type: SET_USERS,
    payload,
});

const followUser = (payload) => ({
    type: FOLLOW_USER,
    payload,
});

const unfollowUser = (payload) => ({
    type: UNFOLLOW_USER,
    payload,
});

export const setPage = (payload) => ({
    type: SET_PAGE,
    payload,
});

export const setTotalUsersCount = (payload) => ({
    type: SET_TOTAL_USERS_COUNT,
    payload,
});

const toggleFollowingUser = (payload) => ({
    type: TOGGLE_FOLLOWING_USER,
    payload,
});

const toggleFetchingUsers = (payload) => ({
    type: TOGGLE_FETCHING_USERS,
    payload,
});


export const getUsersAsyncAction = (page, pageSize) => {
    return async (dispatch) => {
        const response =  await usersApi.getUsers(page, pageSize);
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
};

export const getNewUsersAsyncAction = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleFetchingUsers(true));
        await dispatch(getUsersAsyncAction(page, pageSize));
        dispatch(setPage(page));
        dispatch(toggleFetchingUsers(false));
    }
};


const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingUser({isFetching: true, userId}));
    const response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(toggleFollowingUser({isFetching: false, userId}))
    }
};


export const followUserAsyncAction = (userId) => {
    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.followUser, followUser);
    }
};

export const unFollowUserAsyncAction = (userId) => {
    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.unFollowUser, unfollowUser);
    };
};



export default usersReducer;