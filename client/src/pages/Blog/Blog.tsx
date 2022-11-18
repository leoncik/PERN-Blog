// React Hooks
import { useEffect, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Routing
import { Navigate } from 'react-router-dom';

// Page components
import BlogPost from '../../components/BlogPost/BlogPost';
import {
    genericFetchRequest,
    genericPostRequest,
} from '../../helpers/fetchHandlers';

// CSS
import classes from './Blog.module.css';

function Blog() {
    // Redux
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

    // States
    const [blogPosts, setBlogPosts] = useState([]);

    // Refs
    const postTitleRef = useRef<HTMLInputElement>(null);
    const postContentRef = useRef<HTMLTextAreaElement>(null);

    // Get blog posts
    useEffect(() => {
        console.log(isLoggedIn);
        const fetchBlogPosts = async () => {
            const blogPostsData = await genericFetchRequest(
                'http://localhost:5000/posts/'
            );
            // Sort posts by id
            blogPostsData.sort((a: any, b: any) => a.id - b.id);
            setBlogPosts(blogPostsData);
            console.log(blogPosts);
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

        const requestResponse: any = await genericPostRequest(
            'http://localhost:5000/posts/',
            formData
        );

        console.log(requestResponse);
    };

    return isLoggedIn ? (
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
                    <textarea ref={postContentRef} id="post-content"></textarea>

                    <button>Add blog post</button>
                </form>
            </section>

            <section>
                <h2>Your blog posts</h2>
                {blogPosts.map((blogPost: any, index: number) => (
                    <BlogPost
                        title={blogPost.title}
                        content={blogPost.content}
                        key={index}
                        id={blogPost.id}
                    />
                ))}
            </section>
        </div>
    ) : (
        <Navigate replace to="/" />
    );
}

export default Blog;
