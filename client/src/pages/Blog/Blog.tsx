// React Hooks
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { blogPostsActions, IBlogPosts } from '../../features/blogPostsSlice';

// Routing
import { Navigate } from 'react-router-dom';

// Page components
import AddPost from '../../components/BlogPost/AddPost/AddPost';
import BlogPost from '../../components/BlogPost/BlogPost';
import Layout from '../../components/layout/Layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Separator from '../../components/layout/Separator/Separator';

// Helpers
import { authenticatedRequest } from '../../helpers/fetchHandlers';
import * as endpoint from '../../helpers/apiEndpoints';

// CSS
import classes from './Blog.module.css';

// Interfaces
import { IRootState } from '../../app/store';

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

    // States
    const [isLoading, setIsLoading] = useState(false);

    // Get blog posts
    useEffect(() => {
        const fetchBlogPosts = async () => {
            setIsLoading(true);
            const blogPostsData = await authenticatedRequest(
                'GET',
                endpoint.userBlogPostsEndpoint,
                token
            );

            // Remove empty object if user has not made any posts.
            // This prevents UI bugs when adding and removing blog posts.
            if (blogPostsData[0].id == null && blogPostsData.length === 1) {
                blogPostsData.shift();
            }
            // Sort posts by id
            blogPostsData.sort((a: IBlogPosts, b: IBlogPosts) => a.id - b.id);
            dispatch(blogPostsActions.setBlogPosts(blogPostsData));
            setIsLoading(false);
        };

        fetchBlogPosts();
    }, []);

    return isLoggedIn ? (
        <Layout>
            <div className={classes['blog-page']}>
                <h1>Blog page</h1>
                <section>
                    <h2>Add a blog post</h2>
                    <AddPost />
                </section>

                <Separator />

                <section>
                    <h2>Your blog posts</h2>
                    {isLoading && <LoadingSpinner spinnerColor="gold" />}
                    {/* Map if blogPosts is not undefined or null */}
                    {!isLoading &&
                        blogPosts &&
                        blogPosts !== null &&
                        blogPosts.length !== 0 &&
                        blogPosts.map((blogPost: IBlogPosts, index: number) => (
                            <BlogPost
                                title={blogPost.title}
                                content={blogPost.content}
                                key={index}
                                id={blogPost.id}
                            />
                        ))}
                    {/* Display message if user has not made any post yet */}
                    {!isLoading &&
                        blogPosts &&
                        blogPosts !== null &&
                        blogPosts.length === 0 && (
                            <p>You haven't written anything yet.</p>
                        )}
                </section>
            </div>
        </Layout>
    ) : (
        <Navigate replace to="/" />
    );
}

export default Blog;
