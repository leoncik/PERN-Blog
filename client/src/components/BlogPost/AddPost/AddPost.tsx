// Redux
import { useDispatch, useSelector } from 'react-redux';
import { blogPostsActions } from '../../../features/blogPostsSlice';

// React Hooks
import { useRef } from 'react';

// Helpers
import { authenticatedRequest } from '../../../helpers/fetchHandlers';

// Interfaces
import { IRootState } from '../../../app/store';

// CSS
import classes from './AddPost.module.css';

function AddPost() {
    // Redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const token = useSelector((state: IRootState) => state.user.token);
    const blogPosts = useSelector(
        (state: IRootState) => state?.blogPosts?.blogPosts
    );

    // Refs
    const postTitleRef = useRef<HTMLInputElement>(null);
    const postContentRef = useRef<HTMLTextAreaElement>(null);

    // Create a blog post
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const enteredTitle = postTitleRef.current?.value;
        const enteredContent = postContentRef.current?.value;

        const formData = {
            title: enteredTitle,
            content: enteredContent,
        };

        const newPost = await authenticatedRequest(
            'POST',
            'http://localhost:5000/posts/',
            token,
            formData
        );
        dispatch(blogPostsActions.addBlogPost(newPost.data));

        // Empty form after submission
        if (postTitleRef.current !== null && postContentRef.current !== null) {
            postTitleRef.current.value = '';
            postContentRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes['new-blog-post-form']}>
            <label htmlFor="post-title">Post title</label>
            <input ref={postTitleRef} type="text" id="post-title" />

            <label htmlFor="post-content">Post content</label>
            <textarea ref={postContentRef} id="post-content"></textarea>

            <button>Add blog post</button>
        </form>
    );
}

export default AddPost;
