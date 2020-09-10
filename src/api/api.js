import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'e9e279ef-dd13-4fbe-9838-f9a8b751d52d'
    }
});


export const usersApi = {
    getUsers:(currentPage = 1, pageSize= 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    followUser:(userId) => {
        return instance.post(`follow/${userId}`).then(responce => responce.data);
    },

    unFollowUser:(userId) => {
        return instance.delete(`follow/${userId}`).then(responce => responce.data);
    },



    getUserProfile: (userId) => {
        return instance.get(`/profile/${userId}`).then(responce => responce.data);
    }
};


export const profileApi = {
    getUserStatus: (userId) => {
        return instance.get(`/profile/status/${userId}`).then(response => response.data);
    },

    updateUserStatus: (status) => {
        return instance.put('/profile/status', {status}).then(response => response.data);
    },

    uploadMainPhoto: (photoFile) => {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        });
    },

    updateProfileInfo: (profile) => {
        return instance.put('/profile', profile).then(response => response.data);
    }
};

export const authApi = {
    authorizationUser: () => {
        return instance.get(`auth/me`).then(response => response.data);
    },

    loginUser: (email, password, rememberMe) => {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },

    logoutUser: () => {
        return instance.delete(`auth/login`).then(response => response.data);
    }

};