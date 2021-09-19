import { Auth, LoginPayLoad } from 'models/common';
import { User } from 'models/user';
import axiosClient from "./axiosClient";


const authApi = {
    register(user: User): Promise<Auth>{
        const url = '/api/auth/register';
        return axiosClient.post(url, { user });
    },
    login(userLogin: LoginPayLoad): Promise<Auth>{
        const url = '/api/auth/login';
        return axiosClient.post(url, {userLogin});
    }
}

export default authApi;