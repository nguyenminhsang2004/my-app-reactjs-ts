import { LoginPayLoad } from 'models/common';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models/user";

export interface AuthState {
    isLogged: boolean;
    logging?: boolean;
    registering: boolean;
    currentUser?: User
}

const initialState: AuthState = {
    isLogged: false,
    logging: false,
    registering: false,
    currentUser: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register(state, action: PayloadAction<User>){
            state.registering = true;
        },
        registerSuccess(state, action: PayloadAction<User>){
            state.registering = false;
            state.isLogged = true;
            state.currentUser = action.payload;
        },
        registerFailed(state, action: PayloadAction<string>){
            state.registering = false;
        },
        login(state, action: PayloadAction<LoginPayLoad>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.logging = false;
            state.isLogged = true;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>){
            state.logging = false;
        },
        logout(state){
            state.isLogged = false;
            state.currentUser = undefined;
        },
    }
});


// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectRegistering = (state: RootState) => state.auth.registering;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;