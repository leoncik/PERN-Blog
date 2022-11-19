// Page components
import EditPost from './EditPost/EditPost';

// Redux
import { useSelector } from 'react-redux';

// CSS
import classes from './BlogPost.module.css';

type BlogPostProps = {
    title: string;
    content: string;
    id: number;
};

function BlogPost({ title, content, id }: BlogPostProps) {
    // Redux
    const token = useSelector((state: any) => state.user.token);

    const handleDeletePost = async (postId: number) => {
        try {
            const deletePost = await fetch(
                `http://localhost:5000/posts/${postId}`,
                {
                    method: 'DELETE',
                    headers: {
                        token: token,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article className={classes['blog-post']}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => handleDeletePost(id)}>DELETE POST</button>
            <EditPost title={title} content={content} id={id} />
        </article>
    );
}

export default BlogPost;
