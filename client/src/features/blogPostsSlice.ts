import { createSlice } from '@reduxjs/toolkit';

export interface IBlogPosts {
    id: number;
    title: string;
    content: string;
}

export type BlogPostsType = Array<IBlogPosts>;

const initialState = [
    {
        title: '',
        content: '',
    },
];

const blogPostsSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        editPost: (draft: any, action) => {
            draft.title = action.payload.body.title;
            draft.content = action.payload.body.content;
        },
    },
});

export default blogPostsSlice;

export const blogPostsActions = blogPostsSlice.actions;
