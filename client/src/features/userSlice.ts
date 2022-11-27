import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
    email: string;
    password: string;
    username: string;
    avatar: string;
    isLoggedIn: boolean;
    token: string;
}

const initialState = {
    email: '',
    password: '',
    username: '',
    avatar: '',
    isLoggedIn: false,
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setToken: (draft, action) => {
            draft.token = action.payload;
        },
        setIsLoggedIn: (draft: IUserState, action) => {
            draft.isLoggedIn = true;
            draft.username = action.payload.username;
            draft.avatar = action.payload.avatar;
        },
        setIsLoggedOut: (draft: IUserState) => {
            draft.isLoggedIn = false;
        },
        editUsername: (draft: IUserState, action) => {
            draft.username = action.payload;
        },
        updateAvatar: (draft: IUserState, action) => {
            draft.avatar = action.payload;
        },
    },
});

export default userSlice;

export const userActions = userSlice.actions;
