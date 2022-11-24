// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from '../features/userSlice';
import blogPostsSlice from '../features/blogPostsSlice';

// Interfaces and types
import { IUserState } from '../features/userSlice';
import { IBlogPostsState } from '../features/blogPostsSlice';

export interface IRootState {
    user: IUserState;
    blogPosts: IBlogPostsState | null;
}

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        blogPosts: blogPostsSlice.reducer,
    },
});
