import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "731688df-e320-45c4-ac98-bd4f7ac14174"
    }
});

export const usersAPI ={
    getUsers(currentPage = 1, pageSize=1) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    setUserProfile(userId){
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    followUser(userId){
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollowUser(userId){
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    auth(){
        return instance.get('auth/me')
            .then(response => response.data)
    }
};




