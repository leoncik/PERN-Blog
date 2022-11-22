// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from './features/slices/userSlice';
import blogPostsSlice from './features/slices/blogPostsSlices';

// Interfaces and types
import { IUserState } from './features/slices/userSlice';
import { BlogPostsType } from './features/slices/blogPostsSlices';

export interface IRootState {
    user: IUserState;
    blogPosts: BlogPostsType;
}

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        blogPosts: blogPostsSlice.reducer,
    },
});
