import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    username: '',
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
        setIsLoggedIn: (draft: any, action) => {
            draft.isLoggedIn = true;
            draft.username = action.payload;
        },
        setIsLoggedOut: (draft: any) => {
            draft.isLoggedIn = false;
        },
    },
});

export default userSlice;

export const userActions = userSlice.actions;
