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
        setIsLoggedIn: (draft: any, action) => {
            draft.setIsLoggedIn = true;
            draft.username = action.payload.body.username;
        }
    }
})

export default userSlice;

export const userActions = userSlice.actions;