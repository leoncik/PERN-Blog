// Page components
import EditPost from './EditPost/EditPost';

// Redux
import { useSelector } from 'react-redux';

// CSS
import classes from './BlogPost.module.css';

// Interfaces
import { IRootState } from '../../app/store';

type BlogPostProps = {
    title: string;
    content: string;
    id: number;
};

function BlogPost({ title, content, id }: BlogPostProps) {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);

    const handleDeletePost = async (postId: number) => {
        try {
            await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    token: token,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article className={classes['blog-post']}>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className={classes['action-buttons']}>
                <EditPost title={title} content={content} id={id} />
                <button
                    className={classes['delete-button']}
                    onClick={() => handleDeletePost(id)}
                >
                    DELETE POST
                </button>
            </div>
        </article>
    );
}

export default BlogPost;
