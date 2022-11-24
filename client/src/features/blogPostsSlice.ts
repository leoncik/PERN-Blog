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
        editPost: (draft: IBlogPostsState, action) => {
            draft.blogPosts?.map((blogPost, index) => {
                if (
                    draft?.blogPosts !== null &&
                    blogPost.id === action.payload[1]
                ) {
                    draft.blogPosts[index].title = action.payload[0].title;
                    draft.blogPosts[index].content = action.payload[0].content;
                }
            });
        },
    },
});

export default blogPostsSlice;

export const blogPostsActions = blogPostsSlice.actions;
