// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from './features/slices/userSlice';
import blogPostsSlice from './features/slices/blogPostsSlices';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        blogPosts: blogPostsSlice.reducer,
    },
});
