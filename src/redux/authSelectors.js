export const getAuthId = (state) => {
    return state.auth.id;
};

export const getAuthEmail = (state) => {
    return state.auth.email;
};

export const getAuthLogin = (state) => {
    return state.auth.login;
};

export const getAuthProfile = (state) => {
  return state.auth.authProfile;
};

export const getIsAuthorizing = (state) => {
    return state.auth.isAuthorizing;
};

export const getIsAuth = (state) => {
    return state.auth.isAuth;
};