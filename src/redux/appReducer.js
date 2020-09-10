
import {authUserAsyncAction} from "./authReducer";

const initialState = {
    isInitialized: false,
    authProfile: null,
};

const SET_INITIALIZED = 'appReducer/SET_INITIALIZED';


export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                isInitialized: true,
            }
        }

        default: return state;
    }
};

const setInitialiseApp = () => ({
    type: SET_INITIALIZED,
});



export const initializeAppAsyncAction = () => {
    return async (dispatch) => {
        const authPromise = dispatch(authUserAsyncAction());
        console.log(authPromise);
        // const authProfilePromise = dispatch(setAuthProfile(authPromise));

        await Promise.all([authPromise]);
        dispatch(setInitialiseApp());
    }
};