// React Hooks
import { useEffect, useRef } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Routing
import { Navigate } from 'react-router-dom';

// Page components
import BlogPost from '../../components/BlogPost/BlogPost';
import Layout from '../../components/layout/Layout/Layout';

// Helpers
import { authenticatedRequest } from '../../helpers/fetchHandlers';
import * as endpoint from '../../helpers/apiEndpoints';

// CSS
import classes from './Blog.module.css';

// Interfaces
import { IRootState } from '../../app/store';
import { blogPostsActions, IBlogPosts } from '../../features/blogPostsSlice';

function Blog() {
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

    // Get blog posts
    useEffect(() => {
        console.log(isLoggedIn);
        const fetchBlogPosts = async () => {
            const blogPostsData = await authenticatedRequest(
                'GET',
                endpoint.userBlogPostsEndpoint,
                token
            );
            // Sort posts by id
            blogPostsData.sort((a: IBlogPosts, b: IBlogPosts) => a.id - b.id);
            dispatch(blogPostsActions.setBlogPosts(blogPostsData));
        };

        fetchBlogPosts();
    }, []);

    console.log(blogPosts);

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
    };

    return isLoggedIn ? (
        <Layout>
            <div className={classes['blog-page']}>
                <h1>Blog page</h1>
                <section>
                    <h2>Add a blog post</h2>
                    <form
                        onSubmit={handleSubmit}
                        className={classes['new-blog-post-form']}
                    >
                        <label htmlFor="post-title">Post title</label>
                        <input ref={postTitleRef} type="text" id="post-title" />

                        <label htmlFor="post-content">Post content</label>
                        <textarea
                            ref={postContentRef}
                            id="post-content"
                        ></textarea>

                        <button>Add blog post</button>
                    </form>
                </section>

                <section>
                    <h2>Your blog posts</h2>
                    {/* Map if blogPosts is not undefined or null */}
                    {blogPosts &&
                        blogPosts !== null &&
                        blogPosts.map((blogPost: IBlogPosts, index: number) => (
                            <BlogPost
                                title={blogPost.title}
                                content={blogPost.content}
                                key={index}
                                id={blogPost.id}
                            />
                        ))}
                </section>
            </div>
        </Layout>
    ) : (
        <Navigate replace to="/" />
    );
}

export default Blog;
