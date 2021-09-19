import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';
import { Auth, LoginPayLoad, User } from 'models';
import { toast } from 'react-toastify';
import { authActions } from './authSlice';

function* handleLogin(payload: LoginPayLoad){
    try {
        const data: Auth = yield call(authApi.login, payload);
        if(data.success){
            yield put(authActions.loginSuccess(data.content.user));
            localStorage.setItem('access_token_value', data.content.accessToken);
            localStorage.setItem('user_login', JSON.stringify(data.content.user));
            yield put(push('/home/dashboard'));
        }
        else{
            toast.error(data.content.message);
            yield put(authActions.loginFailed(data.content.message));
        }
       
    } catch (error) {
        console.log(error);
        yield put(authActions.loginFailed('Login failed.'));
    }
}

function* handleLogout(){
    yield delay(2000);
    localStorage.removeItem('access_token_value');
    localStorage.removeItem('user_login');
    yield put(push('/login'));
}

function* handleRegister(payload: User){
    try {
        const data: Auth = yield call(authApi.register, payload);
        if(data.success === true){
            yield put(authActions.registerSuccess(data.content.user));
            localStorage.setItem('access_token_value', data.content.accessToken);
            localStorage.setItem('user_login', JSON.stringify(data.content.user));
            yield put(push('/home/dashboard'));
        }
        else{
            toast.error(data.content.message);
            yield put(authActions.registerFailed(data.content.message));
            
        }
    } catch (error) {
        console.log(error);
        yield put(authActions.registerFailed('Register failed.'));
    }
    
}

function* watchLoginFlow(){
    while(true){
        if(!Boolean(localStorage.getItem('access_token_value'))){
            const action: PayloadAction<any> = yield take([authActions.login.type,authActions.register.type]);
            if(action.type === authActions.login.type){
                yield fork(handleLogin, action.payload);
            }
            else{
                yield fork(handleRegister, action.payload);
            }   
        }
        yield take([authActions.logout.type,authActions.loginFailed.type,authActions.registerFailed]);
        yield call(handleLogout);
    }
}

export default function* authSaga(){
    yield fork(watchLoginFlow);
}