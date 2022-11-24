import { createSlice } from '@reduxjs/toolkit';

export interface IBlogPosts {
    id: number;
    title: string;
    content: string;
}

export type BlogPostsType = Array<IBlogPosts> | null;

export interface IBlogPostsState {
    blogPosts: BlogPostsType;
}

const initialState = {
    blogPosts: null,
};

const blogPostsSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setBlogPosts: (draft: IBlogPostsState, action) => {
            draft.blogPosts = action.payload;
        },
        addBlogPost: (draft: IBlogPostsState, action) => {
            draft.blogPosts?.push(action.payload);
        },
        // editPost: (draft: any, action) => {
        //     draft.title = action.payload.body.title;
        //     draft.content = action.payload.body.content;
        // },
    },
});

export default blogPostsSlice;

export const blogPostsActions = blogPostsSlice.actions;
