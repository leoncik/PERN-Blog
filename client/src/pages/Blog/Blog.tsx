// React Hooks
import { useRef } from 'react';

// Page components
import BlogPost from '../../components/BlogPost/BlogPost';
import { genericPostRequest } from '../../helpers/fetchHandlers';

// CSS
import classes from './Blog.module.css';

function Blog() {
    // Refs
    const postTitleRef = useRef<HTMLInputElement>(null);
    const postContentRef = useRef<HTMLTextAreaElement>(null);

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

    return (
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
            </section>
            <BlogPost />
        </div>
    );
}

export default Blog;
