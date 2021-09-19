import { User } from "models";

export const getCurrentUser = (): User => JSON.parse(localStorage.getItem('user_login') as string);